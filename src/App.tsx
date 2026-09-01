import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from '@/pages/ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore, type AuthState } from '@/store/authStore';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const RootRedirect = () => {
  const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);
  const location = useLocation();

  if (location.pathname === '/') {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return null;
};

function App() {
  const initializeFromStorage = useAuthStore((state: AuthState) => state.initializeFromStorage);

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Products</CardTitle><CardDescription>Manage your product catalog</CardDescription></CardHeader></Card>
            </div>
          } />
          <Route path="orders" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Orders</CardTitle><CardDescription>View and manage customer orders</CardDescription></CardHeader></Card>
            </div>
          } />
          <Route path="quotations" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Quotations</CardTitle><CardDescription>Create and track quotations</CardDescription></CardHeader></Card>
            </div>
          } />
          <Route path="customers" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Customers</CardTitle><CardDescription>Manage customer accounts</CardDescription></CardHeader></Card>
            </div>
          } />
          <Route path="reviews" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Reviews</CardTitle><CardDescription>Moderate product reviews</CardDescription></CardHeader></Card>
            </div>
          } />
          <Route path="pages" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Pages</CardTitle><CardDescription>Manage site content pages</CardDescription></CardHeader></Card>
            </div>
          } />
          <Route path="users" element={
            <div className="p-4">
              <Card><CardHeader><CardTitle>Users</CardTitle><CardDescription>Admin and user management</CardDescription></CardHeader></Card>
            </div>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
