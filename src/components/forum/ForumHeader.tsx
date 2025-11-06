import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

type ForumHeaderProps = {
  currentUser: User;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  getRoleBadge: (role: string) => { text: string; className: string };
};

const ForumHeader = ({ currentUser, searchQuery, onSearchChange, onSearch, getRoleBadge }: ForumHeaderProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
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
  );
};

export default ForumHeader;
