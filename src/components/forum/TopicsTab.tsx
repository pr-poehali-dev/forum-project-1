import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type User = {
  id: number;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  posts: number;
  joinDate: string;
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

type TopicsTabProps = {
  topics: Topic[];
  getRoleBadge: (role: string) => { text: string; className: string };
};

const TopicsTab = ({ topics, getRoleBadge }: TopicsTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};

export default TopicsTab;
