import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Layout from '@/components/layout/Layout';
import HomePage from '@/components/pages/HomePage';
import DoctorsPage from '@/components/pages/DoctorsPage';
import PharmaciesPage from '@/components/pages/PharmaciesPage';
import EmergencyPage from '@/components/pages/EmergencyPage';
import ReportsPage from '@/components/pages/ReportsPage';

import ContactPage from '@/components/pages/ContactPage';
import ProfilePage from '@/components/pages/ProfilePage';
import DashboardPage from '@/components/pages/DashboardPage';
import LoginPage from '@/components/pages/LoginPage';
import PatientDemoPage from '@/components/pages/PatientDemoPage';
import DoctorDemoPage from '@/components/pages/DoctorDemoPage';
import GuestDashboardPage from '@/components/pages/GuestDashboardPage';
import AboutPage from '@/components/pages/AboutPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
      },
      {
        path: "pharmacies",
        element: <PharmaciesPage />,
      },
      {
        path: "emergency",
        element: <EmergencyPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />, // Protected route handled within component
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />, // Protected route handled within component
      },
      {
        path: "dashboard",
        element: <DashboardPage />, // Protected route handled within component
      },
      {
        path: "patient-demo",
        element: <PatientDemoPage />,
      },
      {
        path: "doctor-demo",
        element: <DoctorDemoPage />,
      },
      {
        path: "guest-dashboard",
        element: <GuestDashboardPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
