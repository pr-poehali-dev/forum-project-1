import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type User = {
  id: number;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  posts: number;
  joinDate: string;
};

type Message = {
  id: number;
  from: User;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
};

type MessagesTabProps = {
  messages: Message[];
  onSendMessage: () => void;
};

const MessagesTab = ({ messages, onSendMessage }: MessagesTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
              <Button onClick={onSendMessage} className="w-full gradient-blue-purple text-white hover:opacity-90">
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
    </div>
  );
};

export default MessagesTab;
