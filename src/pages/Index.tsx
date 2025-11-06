import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import ForumHeader from '@/components/forum/ForumHeader';
import ForumsTab from '@/components/forum/ForumsTab';
import TopicsTab from '@/components/forum/TopicsTab';
import MessagesTab from '@/components/forum/MessagesTab';
import SearchTab from '@/components/forum/SearchTab';
import AdminTab from '@/components/forum/AdminTab';
import ForumFooter from '@/components/forum/ForumFooter';

type User = {
  id: number;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  posts: number;
  joinDate: string;
};

type Forum = {
  id: number;
  name: string;
  description: string;
  topics: number;
  posts: number;
  icon: string;
  gradient: string;
};

type Topic = {
  id: number;
  title: string;
  author: User;
  replies: number;
  views: number;
  lastReply: string;
  isPinned?: boolean;
  isLocked?: boolean;
};

type Message = {
  id: number;
  from: User;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
};

const Index = () => {
  const [currentUser] = useState<User>({
    id: 1,
    name: 'Александр',
    avatar: '',
    role: 'admin',
    posts: 342,
    joinDate: '2024-01-15'
  });

  const [activeTab, setActiveTab] = useState('forums');
  const [searchQuery, setSearchQuery] = useState('');

  const forums: Forum[] = [
    {
      id: 1,
      name: 'Общее обсуждение',
      description: 'Темы общего характера и новости сообщества',
      topics: 1250,
      posts: 8430,
      icon: 'MessageSquare',
      gradient: 'gradient-purple-pink'
    },
    {
      id: 2,
      name: 'Технологии',
      description: 'Обсуждение новых технологий, программирования и IT',
      topics: 890,
      posts: 5620,
      icon: 'Code',
      gradient: 'gradient-blue-purple'
    },
    {
      id: 3,
      name: 'Помощь и поддержка',
      description: 'Задавайте вопросы и получайте помощь от сообщества',
      topics: 2340,
      posts: 12500,
      icon: 'HelpCircle',
      gradient: 'gradient-purple-pink'
    },
    {
      id: 4,
      name: 'Креатив и дизайн',
      description: 'Творчество, дизайн, искусство и вдохновение',
      topics: 567,
      posts: 3240,
      icon: 'Palette',
      gradient: 'gradient-blue-purple'
    }
  ];

  const topics: Topic[] = [
    {
      id: 1,
      title: 'Добро пожаловать на наш форум!',
      author: { id: 2, name: 'Мария', avatar: '', role: 'admin', posts: 1250, joinDate: '2023-06-01' },
      replies: 145,
      views: 3200,
      lastReply: '2 часа назад',
      isPinned: true
    },
    {
      id: 2,
      title: 'Новые функции форума: что изменилось?',
      author: { id: 3, name: 'Дмитрий', avatar: '', role: 'moderator', posts: 780, joinDate: '2023-08-15' },
      replies: 89,
      views: 2100,
      lastReply: '5 часов назад',
      isPinned: true
    },
    {
      id: 3,
      title: 'Как правильно оформлять код в сообщениях?',
      author: { id: 4, name: 'Елена', avatar: '', role: 'user', posts: 234, joinDate: '2024-02-10' },
      replies: 67,
      views: 1540,
      lastReply: '1 день назад'
    },
    {
      id: 4,
      title: 'Обсуждение: лучшие практики веб-дизайна',
      author: { id: 5, name: 'Игорь', avatar: '', role: 'user', posts: 156, joinDate: '2024-03-22' },
      replies: 43,
      views: 890,
      lastReply: '2 дня назад'
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      from: { id: 2, name: 'Мария', avatar: '', role: 'admin', posts: 1250, joinDate: '2023-06-01' },
      subject: 'Добро пожаловать!',
      preview: 'Привет! Рады видеть тебя на нашем форуме. Если будут вопросы...',
      date: '1 час назад',
      isRead: false
    },
    {
      id: 2,
      from: { id: 3, name: 'Дмитрий', avatar: '', role: 'moderator', posts: 780, joinDate: '2023-08-15' },
      subject: 'Ответ на твой вопрос',
      preview: 'Я посмотрел твой вопрос в теме и хочу помочь. Попробуй...',
      date: '3 часа назад',
      isRead: true
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast.success(`Поиск: "${searchQuery}"`);
    }
  };

  const handleCreateTopic = () => {
    toast.success('Тема создана успешно!');
  };

  const handleSendMessage = () => {
    toast.success('Сообщение отправлено!');
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { text: string; className: string }> = {
      admin: { text: 'Админ', className: 'gradient-purple-pink text-white' },
      moderator: { text: 'Модератор', className: 'gradient-blue-purple text-white' },
      user: { text: 'Пользователь', className: 'bg-muted text-muted-foreground' }
    };
    return variants[role] || variants.user;
  };

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader
        currentUser={currentUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        getRoleBadge={getRoleBadge}
      />

      <main className="container px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="forums" className="gap-2">
              <Icon name="LayoutGrid" className="h-4 w-4" />
              <span className="hidden sm:inline">Форумы</span>
            </TabsTrigger>
            <TabsTrigger value="topics" className="gap-2">
              <Icon name="MessageSquare" className="h-4 w-4" />
              <span className="hidden sm:inline">Темы</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2 relative">
              <Icon name="Mail" className="h-4 w-4" />
              <span className="hidden sm:inline">Сообщения</span>
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-[10px] gradient-purple-pink text-white">1</Badge>
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Icon name="Search" className="h-4 w-4" />
              <span className="hidden sm:inline">Поиск</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <Icon name="Shield" className="h-4 w-4" />
              <span className="hidden sm:inline">Админ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forums">
            <ForumsTab forums={forums} onCreateTopic={handleCreateTopic} />
          </TabsContent>

          <TabsContent value="topics">
            <TopicsTab topics={topics} getRoleBadge={getRoleBadge} />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab messages={messages} onSendMessage={handleSendMessage} />
          </TabsContent>

          <TabsContent value="search">
            <SearchTab searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />
          </TabsContent>

          <TabsContent value="admin">
            <AdminTab />
          </TabsContent>
        </Tabs>
      </main>

      <ForumFooter />
    </div>
  );
};

export default Index;
