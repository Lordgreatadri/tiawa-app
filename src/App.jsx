import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsPage from './pages/AnalyticsPage';
import ApiConsolePage from './pages/ApiConsolePage';
import BillingPage from './pages/BillingPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import DeveloperPage from './pages/DeveloperPage';
import HomePage from './pages/HomePage';
import LinksPage from './pages/LinksPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/developers' element={<DeveloperPage />} />
      <Route
        path='/dashboard'
        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
      />
      <Route
        path='/dashboard/links'
        element={<ProtectedRoute><LinksPage /></ProtectedRoute>}
      />
      <Route
        path='/dashboard/analytics'
        element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>}
      />
      <Route
        path='/dashboard/api'
        element={<ProtectedRoute><ApiConsolePage /></ProtectedRoute>}
      />
      <Route
        path='/dashboard/billing'
        element={<ProtectedRoute><BillingPage /></ProtectedRoute>}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}