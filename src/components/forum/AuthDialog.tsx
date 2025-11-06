import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: any, token: string) => void;
}

const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast.error('Заполните все поля');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.login(loginEmail, loginPassword);
      toast.success('Вход выполнен!');
      onAuthSuccess(response.user, response.token);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!regUsername || !regEmail || !regPassword) {
      toast.error('Заполните все поля');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.register(regUsername, regEmail, regPassword);
      toast.success('Регистрация успешна!');
      onAuthSuccess(response.user, response.token);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход или регистрация</DialogTitle>
          <DialogDescription>Войдите, чтобы создавать темы и отвечать</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="user@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="login-password">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full gradient-purple-pink text-white"
            >
              {loading ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : 'Войти'}
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="reg-username">Имя пользователя</Label>
              <Input
                id="reg-username"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="username"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="user@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="reg-password">Пароль</Label>
              <Input
                id="reg-password"
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleRegister}
              disabled={loading}
              className="w-full gradient-purple-pink text-white"
            >
              {loading ? <Icon name="Loader2" className="h-4 w-4 animate-spin" /> : 'Зарегистрироваться'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
