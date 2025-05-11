import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthLayout from 'src/layouts/auth/AuthLayout';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthLayout>
        <div>Hello World</div>
      </AuthLayout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <div>Hello Dashboard</div>
      </DashboardLayout>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
