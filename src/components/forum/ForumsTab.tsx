import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type Forum = {
  id: number;
  name: string;
  description: string;
  topics: number;
  posts: number;
  icon: string;
  gradient: string;
};

type ForumsTabProps = {
  forums: Forum[];
  onCreateTopic: () => void;
};

const ForumsTab = ({ forums, onCreateTopic }: ForumsTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
              <Button onClick={onCreateTopic} className="w-full gradient-purple-pink text-white hover:opacity-90">
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
    </div>
  );
};

export default ForumsTab;
