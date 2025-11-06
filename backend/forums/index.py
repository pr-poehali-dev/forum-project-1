'''
Business: Manage forum categories (list, create, update)
Args: event with httpMethod, body, queryStringParameters
Returns: HTTP response with forum categories data
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
        
        if method == 'GET':
            cur.execute('''
                SELECT 
                    fc.*,
                    COUNT(DISTINCT t.id) as topics_count,
                    COALESCE(SUM(t.replies_count), 0) as total_posts
                FROM forum_categories fc
                LEFT JOIN topics t ON t.category_id = fc.id
                GROUP BY fc.id
                ORDER BY fc.sort_order, fc.id
            ''')
            categories = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps([dict(cat) for cat in categories], default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            name = body_data.get('name', '')
            description = body_data.get('description', '')
            icon = body_data.get('icon', 'MessageSquare')
            gradient = body_data.get('gradient', 'gradient-purple-pink')
            
            if not name:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Name is required'})
                }
            
            cur.execute('''
                INSERT INTO forum_categories (name, description, icon, gradient)
                VALUES (%s, %s, %s, %s)
                RETURNING *
            ''', (name, description, icon, gradient))
            
            category = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps(dict(category), default=str)
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
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
