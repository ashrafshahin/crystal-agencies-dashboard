import { useNavigate } from 'react-router-dom';
import { LogOut, Gem } from 'lucide-react';
import { useAuthStore, type AuthState } from '@/store/authStore';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const logout = useAuthStore((state: AuthState) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Gem className="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Crystal Agencies</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium leading-none">{user?.name || 'Admin User'}</p>
            {/* <p className="text-xs text-muted-foreground capitalize">{user?.role?.name || 'admin'}</p> */}
            <p className="text-xs text-muted-foreground capitalize">
              {typeof user?.role === 'string' ? user.role : user?.role?.name || 'admin'}
              </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-muted flex items-center justify-center font-medium text-sm">
              {(user?.name || 'A').charAt(0).toUpperCase()}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Log out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
