'''
Business: Manage posts and replies in topics
Args: event with httpMethod, body for creating posts
Returns: HTTP response with post data
'''
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            topic_id = body_data.get('topic_id')
            user_id = body_data.get('user_id')
            content = body_data.get('content', '')
            attachments = body_data.get('attachments', [])
            
            if not all([topic_id, user_id, content]):
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cur.execute('''
                INSERT INTO posts (topic_id, user_id, content)
                VALUES (%s, %s, %s)
                RETURNING *
            ''', (topic_id, user_id, content))
            
            post = cur.fetchone()
            post_id = post['id']
            
            for att in attachments:
                cur.execute('''
                    INSERT INTO attachments (post_id, file_url, file_type, file_name, file_size)
                    VALUES (%s, %s, %s, %s, %s)
                ''', (post_id, att.get('url'), att.get('type'), att.get('name'), att.get('size')))
            
            cur.execute('''
                UPDATE topics 
                SET replies_count = replies_count + 1, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            ''', (topic_id,))
            
            cur.execute('''
                UPDATE users SET posts_count = posts_count + 1
                WHERE id = %s
            ''', (user_id,))
            
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps(dict(post), default=str)
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
