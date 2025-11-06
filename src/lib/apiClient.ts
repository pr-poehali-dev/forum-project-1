const API_URLS = {
  auth: 'https://functions.poehali.dev/95c6dc60-bf96-49f1-bd2a-0dc110212b0f',
  forums: 'https://functions.poehali.dev/c4f0aa26-4b28-4aac-9806-048bbabc9298',
  topics: 'https://functions.poehali.dev/ea576bbe-6668-4e3d-9dcd-00f0f63bc3ac',
  posts: 'https://functions.poehali.dev/d69e2fa7-4af8-4be1-9730-5746ec3c4c3a',
  likes: 'https://functions.poehali.dev/ffab8988-3423-4f0e-923b-49c0a640f295'
};

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  avatar_url?: string;
  posts_count: number;
  created_at: string;
}

export interface Forum {
  id: number;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  topics_count: number;
  total_posts: number;
}

export interface Topic {
  id: number;
  category_id: number;
  user_id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  views_count: number;
  replies_count: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
  author_avatar?: string;
  author_role?: string;
  posts?: Post[];
}

export interface Post {
  id: number;
  topic_id: number;
  user_id: number;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
  author_avatar?: string;
  author_role?: string;
}

class ApiClient {
  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  async register(username: string, email: string, password: string) {
    return this.request(API_URLS.auth, {
      method: 'POST',
      body: JSON.stringify({ action: 'register', username, email, password }),
    });
  }

  async login(email: string, password: string) {
    return this.request(API_URLS.auth, {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password }),
    });
  }

  async getForums(): Promise<Forum[]> {
    return this.request(API_URLS.forums);
  }

  async createForum(name: string, description: string, icon: string, gradient: string) {
    return this.request(API_URLS.forums, {
      method: 'POST',
      body: JSON.stringify({ name, description, icon, gradient }),
    });
  }

  async getTopics(categoryId?: number): Promise<Topic[]> {
    const params = categoryId ? `?category_id=${categoryId}` : '';
    return this.request(API_URLS.topics + params);
  }

  async getTopic(id: number): Promise<Topic> {
    return this.request(`${API_URLS.topics}?id=${id}`);
  }

  async createTopic(userId: number, categoryId: number, title: string, content: string) {
    return this.request(API_URLS.topics, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, category_id: categoryId, title, content }),
    });
  }

  async createPost(userId: number, topicId: number, content: string, attachments: any[] = []) {
    return this.request(API_URLS.posts, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, topic_id: topicId, content, attachments }),
    });
  }

  async toggleLike(userId: number, postId: number) {
    return this.request(API_URLS.likes, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, post_id: postId }),
    });
  }
}

export const apiClient = new ApiClient();
