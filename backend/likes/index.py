'''
Business: Toggle likes on posts
Args: event with httpMethod POST, body with user_id and post_id
Returns: HTTP response with like status
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
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        body_data = json.loads(event.get('body', '{}'))
        user_id = body_data.get('user_id')
        post_id = body_data.get('post_id')
        
        if not all([user_id, post_id]):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing user_id or post_id'})
            }
        
        cur.execute('''
            SELECT id FROM likes WHERE user_id = %s AND post_id = %s
        ''', (user_id, post_id))
        
        existing_like = cur.fetchone()
        
        if existing_like:
            cur.execute('''
                DELETE FROM likes WHERE user_id = %s AND post_id = %s
            ''', (user_id, post_id))
            
            cur.execute('''
                UPDATE posts SET likes_count = likes_count - 1
                WHERE id = %s
            ''', (post_id,))
            
            action = 'unliked'
        else:
            cur.execute('''
                INSERT INTO likes (user_id, post_id)
                VALUES (%s, %s)
            ''', (user_id, post_id))
            
            cur.execute('''
                UPDATE posts SET likes_count = likes_count + 1
                WHERE id = %s
            ''', (post_id,))
            
            action = 'liked'
        
        cur.execute('''
            SELECT likes_count FROM posts WHERE id = %s
        ''', (post_id,))
        
        result = cur.fetchone()
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'action': action,
                'likes_count': result['likes_count'] if result else 0
            })
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
