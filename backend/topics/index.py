'''
Business: Manage forum topics (list, create, update, view)
Args: event with httpMethod, body, queryStringParameters
Returns: HTTP response with topics data
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
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        params = event.get('queryStringParameters', {}) or {}
        
        if method == 'GET':
            topic_id = params.get('id')
            category_id = params.get('category_id')
            
            if topic_id:
                cur.execute('''
                    UPDATE topics SET views_count = views_count + 1 
                    WHERE id = %s
                ''', (topic_id,))
                
                cur.execute('''
                    SELECT 
                        t.*,
                        u.username as author_name,
                        u.avatar_url as author_avatar,
                        u.role as author_role,
                        u.posts_count as author_posts
                    FROM topics t
                    LEFT JOIN users u ON t.user_id = u.id
                    WHERE t.id = %s
                ''', (topic_id,))
                topic = cur.fetchone()
                
                cur.execute('''
                    SELECT 
                        p.*,
                        u.username as author_name,
                        u.avatar_url as author_avatar,
                        u.role as author_role,
                        u.posts_count as author_posts
                    FROM posts p
                    LEFT JOIN users u ON p.user_id = u.id
                    WHERE p.topic_id = %s
                    ORDER BY p.created_at ASC
                ''', (topic_id,))
                posts = cur.fetchall()
                
                conn.commit()
                
                result = dict(topic) if topic else None
                if result:
                    result['posts'] = [dict(p) for p in posts]
                
                return {
                    'statusCode': 200 if result else 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps(result, default=str)
                }
            
            query = '''
                SELECT 
                    t.*,
                    u.username as author_name,
                    u.avatar_url as author_avatar,
                    u.role as author_role
                FROM topics t
                LEFT JOIN users u ON t.user_id = u.id
            '''
            
            if category_id:
                query += ' WHERE t.category_id = %s'
                query += ' ORDER BY t.is_pinned DESC, t.updated_at DESC'
                cur.execute(query, (category_id,))
            else:
                query += ' ORDER BY t.is_pinned DESC, t.updated_at DESC'
                cur.execute(query)
            
            topics = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps([dict(t) for t in topics], default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            user_id = body_data.get('user_id')
            category_id = body_data.get('category_id')
            title = body_data.get('title', '')
            content = body_data.get('content', '')
            
            if not all([user_id, category_id, title, content]):
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'})
                }
            
            cur.execute('''
                INSERT INTO topics (category_id, user_id, title, content)
                VALUES (%s, %s, %s, %s)
                RETURNING *
            ''', (category_id, user_id, title, content))
            
            topic = cur.fetchone()
            
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
                'body': json.dumps(dict(topic), default=str)
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
