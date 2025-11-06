import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ForumFooter = () => {
  return (
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
  );
};

export default ForumFooter;
