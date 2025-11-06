import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AdminTab = () => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};

export default AdminTab;
