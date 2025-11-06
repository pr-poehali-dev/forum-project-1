import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-purple-pink">
              <Icon name="MessageCircle" className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">ForumHub</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Icon name="Search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по форуму..."
                className="pl-10 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                3
              </span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover-scale">
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarImage src="" />
                    <AvatarFallback className="gradient-purple-pink text-white text-sm font-semibold">
                      {currentUser.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.posts} постов</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Профиль пользователя</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-primary">
                      <AvatarImage src="" />
                      <AvatarFallback className="gradient-purple-pink text-white text-3xl font-bold">
                        {currentUser.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{currentUser.name}</h3>
                      <Badge className={getRoleBadge(currentUser.role).className}>
                        {getRoleBadge(currentUser.role).text}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-card p-4 border border-border">
                      <p className="text-sm text-muted-foreground">Постов</p>
                      <p className="text-2xl font-bold gradient-text">{currentUser.posts}</p>
                    </div>
                    <div className="rounded-lg bg-card p-4 border border-border">
                      <p className="text-sm text-muted-foreground">Дата регистрации</p>
                      <p className="text-sm font-semibold mt-1">{currentUser.joinDate}</p>
                    </div>
                  </div>
                  <Button className="w-full gradient-purple-pink text-white hover:opacity-90">
                    Редактировать профиль
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

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

          <TabsContent value="forums" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Разделы форума</h2>
                <p className="text-muted-foreground mt-1">Выберите раздел для просмотра тем</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-purple-pink text-white hover:opacity-90 gap-2">
                    <Icon name="Plus" className="h-4 w-4" />
                    Создать тему
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создать новую тему</DialogTitle>
                    <DialogDescription>Заполните форму для создания новой темы обсуждения</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Заголовок темы</Label>
                      <Input id="title" placeholder="Введите заголовок..." className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="content">Содержание</Label>
                      <Textarea id="content" placeholder="Опишите вашу тему..." className="mt-2 min-h-[200px]" />
                    </div>
                    <Button onClick={handleCreateTopic} className="w-full gradient-purple-pink text-white hover:opacity-90">
                      <Icon name="Send" className="h-4 w-4 mr-2" />
                      Опубликовать тему
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {forums.map((forum) => (
                <Card key={forum.id} className="hover-scale cursor-pointer overflow-hidden border-border transition-all hover:shadow-xl hover:shadow-primary/20">
                  <div className={`h-2 ${forum.gradient}`} />
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${forum.gradient} flex-shrink-0`}>
                        <Icon name={forum.icon as any} className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl">{forum.name}</CardTitle>
                        <CardDescription className="mt-1">{forum.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="FileText" className="h-4 w-4" />
                        <span>{forum.topics} тем</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="MessageCircle" className="h-4 w-4" />
                        <span>{forum.posts} постов</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Активные темы</h2>
                <p className="text-muted-foreground mt-1">Последние обсуждения сообщества</p>
              </div>
            </div>

            <div className="space-y-3">
              {topics.map((topic) => (
                <Card key={topic.id} className="hover-scale cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary flex-shrink-0">
                        <AvatarImage src={topic.author.avatar} />
                        <AvatarFallback className="gradient-blue-purple text-white font-semibold">
                          {topic.author.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          {topic.isPinned && (
                            <Badge className="gradient-purple-pink text-white gap-1">
                              <Icon name="Pin" className="h-3 w-3" />
                              Закреплено
                            </Badge>
                          )}
                          {topic.isLocked && (
                            <Badge variant="secondary" className="gap-1">
                              <Icon name="Lock" className="h-3 w-3" />
                              Закрыто
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                          <span className="font-medium text-foreground">{topic.author.name}</span>
                          <Badge className={getRoleBadge(topic.author.role).className + ' text-xs'}>
                            {getRoleBadge(topic.author.role).text}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Icon name="MessageSquare" className="h-4 w-4" />
                            {topic.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" className="h-4 w-4" />
                            {topic.views}
                          </span>
                          <span className="flex items-center gap-1 ml-auto">
                            <Icon name="Clock" className="h-4 w-4" />
                            {topic.lastReply}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Личные сообщения</h2>
                <p className="text-muted-foreground mt-1">Ваша переписка с другими пользователями</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-blue-purple text-white hover:opacity-90 gap-2">
                    <Icon name="Send" className="h-4 w-4" />
                    Новое сообщение
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Написать сообщение</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Получатель</Label>
                      <Input id="recipient" placeholder="Имя пользователя" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Тема</Label>
                      <Input id="subject" placeholder="Тема сообщения" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea id="message" placeholder="Текст сообщения..." className="mt-2 min-h-[150px]" />
                    </div>
                    <Button onClick={handleSendMessage} className="w-full gradient-blue-purple text-white hover:opacity-90">
                      <Icon name="Send" className="h-4 w-4 mr-2" />
                      Отправить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {messages.map((message) => (
                <Card key={message.id} className={`hover-scale cursor-pointer transition-all hover:shadow-lg ${!message.isRead ? 'border-primary' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary flex-shrink-0">
                        <AvatarImage src={message.from.avatar} />
                        <AvatarFallback className="gradient-purple-pink text-white font-semibold">
                          {message.from.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{message.subject}</h3>
                            <p className="text-sm text-muted-foreground mt-1">от {message.from.name}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!message.isRead && (
                              <Badge className="gradient-purple-pink text-white">Новое</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">{message.date}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-2">{message.preview}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-4 animate-fade-in">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Поиск по форуму</CardTitle>
                <CardDescription>Найдите темы, посты и пользователей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Icon name="Search" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Введите запрос для поиска..."
                      className="pl-10 h-12 text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button onClick={handleSearch} className="gradient-purple-pink text-white hover:opacity-90 h-12 px-8">
                    Найти
                  </Button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="cursor-pointer hover-scale">
                    <Icon name="Tag" className="h-3 w-3 mr-1" />
                    Темы
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover-scale">
                    <Icon name="MessageCircle" className="h-3 w-3 mr-1" />
                    Посты
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover-scale">
                    <Icon name="User" className="h-3 w-3 mr-1" />
                    Пользователи
                  </Badge>
                </div>

                <div className="rounded-lg border border-border p-8 text-center">
                  <Icon name="Search" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Введите запрос для начала поиска</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold">Панель администратора</h2>
              <p className="text-muted-foreground mt-1">Управление форумом и пользователями</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="h-5 w-5" />
                    Пользователи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold gradient-text">2,847</p>
                  <p className="text-sm text-muted-foreground mt-2">+124 за неделю</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquare" className="h-5 w-5" />
                    Темы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold gradient-text">5,047</p>
                  <p className="text-sm text-muted-foreground mt-2">+87 за неделю</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Flag" className="h-5 w-5" />
                    Жалобы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold gradient-text">12</p>
                  <p className="text-sm text-muted-foreground mt-2">Требуют внимания</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover-scale cursor-pointer border-border transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="UserCog" className="h-5 w-5" />
                    Управление пользователями
                  </CardTitle>
                  <CardDescription>Просмотр, редактирование и блокировка пользователей</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale cursor-pointer border-border transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" className="h-5 w-5" />
                    Управление форумами
                  </CardTitle>
                  <CardDescription>Создание, редактирование и удаление разделов</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale cursor-pointer border-border transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="AlertTriangle" className="h-5 w-5" />
                    Жалобы и отчеты
                  </CardTitle>
                  <CardDescription>Модерация контента и обработка жалоб</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale cursor-pointer border-border transition-all hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart" className="h-5 w-5" />
                    Статистика
                  </CardTitle>
                  <CardDescription>Аналитика активности и метрики форума</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 bg-card">
        <div className="container px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-purple-pink">
                  <Icon name="MessageCircle" className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold gradient-text">ForumHub</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Современная платформа для общения и обмена идеями
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Форум</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">Правила</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">FAQ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">Помощь</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Контакты</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Обратная связь</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Github" className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Twitter" className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Facebook" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 ForumHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
