import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Users,
  MessageSquare,
  Layers,
  Shield,
  Gem,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Quotations',
    href: '/dashboard/quotations',
    icon: FileText,
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    title: 'Reviews',
    href: '/dashboard/reviews',
    icon: MessageSquare,
  },
  {
    title: 'Pages',
    href: '/dashboard/pages',
    icon: Layers,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Shield,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex h-screen sticky top-0 w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground p-1.5 rounded-lg">
          <Gem className="size-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
          Crystal Agencies
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/dashboard'}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                isActive &&
                  'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground'
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent p-4">
          <p className="text-xs font-medium text-sidebar-foreground/80">
            Dashboard v1.0.0
          </p>
          <p className="mt-1 text-[11px] text-sidebar-foreground/50">
            Crystal Agencies Admin Panel
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
