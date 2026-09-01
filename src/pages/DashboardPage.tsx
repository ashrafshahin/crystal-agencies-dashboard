import {
  Users,
  Package,
  ShoppingCart,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

const recentOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-0001',
    userId: 'u1',
    customerName: 'Ahmed Hassan',
    customerEmail: 'ahmed@example.com',
    shippingAddress: '123 Main St, City',
    items: [],
    subtotal: 2500,
    tax: 250,
    shippingFee: 100,
    total: 2850,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-09-02T14:30:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-0002',
    userId: 'u2',
    customerName: 'Fatima Ali',
    customerEmail: 'fatima@example.com',
    shippingAddress: '456 Oak Ave, Town',
    items: [],
    subtotal: 1800,
    tax: 180,
    shippingFee: 80,
    total: 2060,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2024-09-01T14:20:00Z',
    updatedAt: '2024-09-01T18:00:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-0003',
    userId: 'u3',
    customerName: 'Omar Khalid',
    customerEmail: 'omar@example.com',
    shippingAddress: '789 Pine Rd, Village',
    items: [],
    subtotal: 3200,
    tax: 320,
    shippingFee: 150,
    total: 3670,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2024-09-01T16:45:00Z',
    updatedAt: '2024-09-01T16:45:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-0004',
    userId: 'u4',
    customerName: 'Layla Ibrahim',
    customerEmail: 'layla@example.com',
    shippingAddress: '321 Cedar Ln, City',
    items: [],
    subtotal: 950,
    tax: 95,
    shippingFee: 50,
    total: 1095,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-09-01T18:30:00Z',
    updatedAt: '2024-09-01T18:30:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-0005',
    userId: 'u5',
    customerName: 'Sara Mahmoud',
    customerEmail: 'sara@example.com',
    shippingAddress: '654 Birch Dr, Suburb',
    items: [],
    subtotal: 4100,
    tax: 410,
    shippingFee: 200,
    total: 4710,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: '2024-08-31T09:15:00Z',
    updatedAt: '2024-09-01T11:00:00Z',
  },
];

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  const stats = [
    {
      title: 'Total Users',
      value: '1,248',
      change: '+12.5%',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Total Products',
      value: '356',
      change: '+4.2%',
      icon: Package,
      trend: 'up' as const,
    },
    {
      title: 'Total Orders',
      value: '892',
      change: '+18.7%',
      icon: ShoppingCart,
      trend: 'up' as const,
    },
    {
      title: 'Total Quotations',
      value: '124',
      change: '+8.1%',
      icon: FileText,
      trend: 'up' as const,
    },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border-primary/20">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <CardTitle className="text-2xl">
                Welcome back, {user?.name?.split(' ')[0] || 'Admin'}!
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Here's what's happening with Crystal Agencies today.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-sm">
              <p className="text-muted-foreground">Today's Date</p>
              <p className="font-medium">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Orders Today</p>
              <p className="font-medium">12 orders</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Revenue Today</p>
              <p className="font-medium">AED 24,580</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Pending Tasks</p>
              <p className="font-medium">5 items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center text-sm">
                    <span
                      className={cn(
                        'font-medium',
                        stat.trend === 'up'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-destructive'
                      )}
                    >
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1.5">vs last month</span>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <stat.icon className="size-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders placed across the store</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {order.customerEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    AED {order.total.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize',
                        statusStyles[order.status]
                      )}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
