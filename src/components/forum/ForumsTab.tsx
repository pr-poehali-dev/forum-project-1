import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { apiClient, Forum } from '@/lib/apiClient';
import { toast } from 'sonner';
import ImageUploader from './ImageUploader';
import CodeBlock from './CodeBlock';

type ForumsTabProps = {
  currentUserId?: number;
};

const ForumsTab = ({ currentUserId }: ForumsTabProps) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    loadForums();
  }, []);

  const loadForums = async () => {
    try {
      const data = await apiClient.getForums();
      setForums(data);
    } catch (error) {
      toast.error('Ошибка загрузки форумов');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async () => {
    if (!currentUserId) {
      toast.error('Войдите, чтобы создать тему');
      return;
    }
    
    if (!selectedCategory) {
      toast.error('Выберите категорию');
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error('Заполните все поля');
      return;
    }

    try {
      let finalContent = content;
      if (uploadedImages.length > 0) {
        uploadedImages.forEach(img => {
          finalContent += `\n\n![](${img})`;
        });
      }

      await apiClient.createTopic(currentUserId, selectedCategory, title, finalContent);
      toast.success('Тема создана!');
      setTitle('');
      setContent('');
      setSelectedCategory(null);
      setUploadedImages([]);
      setDialogOpen(false);
      loadForums();
    } catch (error) {
      toast.error('Ошибка создания темы');
    }
  };

  const handleImageUpload = (url: string) => {
    setUploadedImages([...uploadedImages, url]);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Icon name="Loader2" className="h-8 w-8 animate-spin" /></div>;
  }
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Разделы форума</h2>
          <p className="text-muted-foreground mt-1">Выберите раздел для просмотра тем</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                <Label htmlFor="category">Категория</Label>
                <select
                  id="category"
                  className="w-full mt-2 px-3 py-2 border rounded-md"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(Number(e.target.value))}
                >
                  <option value="">Выберите категорию</option>
                  {forums.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="title">Заголовок темы</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите заголовок..." className="mt-2" />
              </div>
              <div>
                <Label htmlFor="content">Содержание</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Опишите вашу тему..." className="mt-2 min-h-[200px]" />
                <div className="mt-2 flex gap-2">
                  <ImageUploader onImageUpload={handleImageUpload} />
                  {uploadedImages.length > 0 && <span className="text-sm text-muted-foreground self-center">{uploadedImages.length} фото</span>}
                </div>
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
                  <span>{forum.topics_count} тем</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                  <span>{forum.total_posts} постов</span>
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