import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { apiClient, Topic as ApiTopic, Post } from '@/lib/apiClient';
import { toast } from 'sonner';
import PostContent from './PostContent';
import ImageUploader from './ImageUploader';

type TopicsTabProps = {
  currentUserId?: number;
  getRoleBadge: (role: string) => { text: string; className: string };
};

const TopicsTab = ({ currentUserId, getRoleBadge }: TopicsTabProps) => {
  const [topics, setTopics] = useState<ApiTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<ApiTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [likingPost, setLikingPost] = useState<number | null>(null);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await apiClient.getTopics();
      setTopics(data);
    } catch (error) {
      toast.error('Ошибка загрузки тем');
    } finally {
      setLoading(false);
    }
  };

  const loadTopicDetails = async (id: number) => {
    try {
      const data = await apiClient.getTopic(id);
      setSelectedTopic(data);
    } catch (error) {
      toast.error('Ошибка загрузки темы');
    }
  };

  const handleReply = async () => {
    if (!currentUserId || !selectedTopic) {
      toast.error('Войдите, чтобы ответить');
      return;
    }

    if (!replyContent.trim()) {
      toast.error('Введите текст ответа');
      return;
    }

    try {
      let finalContent = replyContent;
      if (uploadedImages.length > 0) {
        uploadedImages.forEach(img => {
          finalContent += `\n\n![](${img})`;
        });
      }

      await apiClient.createPost(currentUserId, selectedTopic.id, finalContent);
      toast.success('Ответ опубликован!');
      setReplyContent('');
      setUploadedImages([]);
      loadTopicDetails(selectedTopic.id);
    } catch (error) {
      toast.error('Ошибка создания ответа');
    }
  };

  const handleLike = async (postId: number) => {
    if (!currentUserId) {
      toast.error('Войдите, чтобы поставить лайк');
      return;
    }

    setLikingPost(postId);
    try {
      await apiClient.toggleLike(currentUserId, postId);
      if (selectedTopic) {
        loadTopicDetails(selectedTopic.id);
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLikingPost(null);
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
          <h2 className="text-3xl font-bold">Активные темы</h2>
          <p className="text-muted-foreground mt-1">Последние обсуждения сообщества</p>
        </div>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            className="hover-scale cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/10"
            onClick={() => loadTopicDetails(topic.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary flex-shrink-0">
                  <AvatarImage src={topic.author_avatar} />
                  <AvatarFallback className="gradient-blue-purple text-white font-semibold">
                    {(topic.author_name || 'U')[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    {topic.is_pinned && (
                      <Badge className="gradient-purple-pink text-white gap-1">
                        <Icon name="Pin" className="h-3 w-3" />
                        Закреплено
                      </Badge>
                    )}
                    {topic.is_locked && (
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="Lock" className="h-3 w-3" />
                        Закрыто
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                    <span className="font-medium text-foreground">{topic.author_name}</span>
                    {topic.author_role && (
                      <Badge className={getRoleBadge(topic.author_role).className + ' text-xs'}>
                        {getRoleBadge(topic.author_role).text}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1">
                      <Icon name="MessageSquare" className="h-4 w-4" />
                      {topic.replies_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" className="h-4 w-4" />
                      {topic.views_count}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTopic} onOpenChange={() => setSelectedTopic(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedTopic?.title}</DialogTitle>
          </DialogHeader>

          {selectedTopic && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedTopic.author_avatar} />
                      <AvatarFallback className="gradient-purple-pink text-white">
                        {(selectedTopic.author_name || 'U')[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{selectedTopic.author_name}</span>
                        {selectedTopic.author_role && (
                          <Badge className={getRoleBadge(selectedTopic.author_role).className + ' text-xs'}>
                            {getRoleBadge(selectedTopic.author_role).text}
                          </Badge>
                        )}
                      </div>
                      <PostContent content={selectedTopic.content} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedTopic.posts && selectedTopic.posts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Ответы ({selectedTopic.posts.length})</h3>
                  {selectedTopic.posts.map((post: Post) => (
                    <Card key={post.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author_avatar} />
                            <AvatarFallback className="gradient-blue-purple text-white">
                              {(post.author_name || 'U')[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{post.author_name}</span>
                              {post.author_role && (
                                <Badge className={getRoleBadge(post.author_role).className + ' text-xs'}>
                                  {getRoleBadge(post.author_role).text}
                                </Badge>
                              )}
                            </div>
                            <PostContent content={post.content} />
                            <div className="flex items-center gap-2 mt-3">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleLike(post.id)}
                                disabled={likingPost === post.id}
                              >
                                <Icon name="Heart" className="h-4 w-4 mr-1" />
                                {post.likes_count}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!selectedTopic.is_locked && (
                <div className="space-y-3 border-t pt-6">
                  <h3 className="font-semibold">Ваш ответ</h3>
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Напишите ответ... Поддерживается Markdown и блоки кода"
                    className="min-h-[150px]"
                  />
                  <div className="flex gap-2">
                    <ImageUploader onImageUpload={handleImageUpload} />
                    {uploadedImages.length > 0 && (
                      <span className="text-sm text-muted-foreground self-center">
                        {uploadedImages.length} фото
                      </span>
                    )}
                  </div>
                  <Button onClick={handleReply} className="gradient-purple-pink text-white">
                    <Icon name="Send" className="h-4 w-4 mr-2" />
                    Отправить ответ
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopicsTab;
