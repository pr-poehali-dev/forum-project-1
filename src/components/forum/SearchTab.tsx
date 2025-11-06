import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type SearchTabProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
};

const SearchTab = ({ searchQuery, onSearchChange, onSearch }: SearchTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </div>
            <Button onClick={onSearch} className="gradient-purple-pink text-white hover:opacity-90 h-12 px-8">
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
    </div>
  );
};

export default SearchTab;
