import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import RegisterClient from './pages/RegisterClient';
import ClientClinicalDetailsPage from './pages/ClientClinicalDetailsPage';
import Account from './pages/Account';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RegisterUserPage from './pages/RegisterUserPage';
import ReportsPage from './pages/ReportsPage';
import AddCHVPage from './pages/AddCHVPage';
import ReportDefaulters from './pages/ReportDefaulters';

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    //element: <DashboardLayout />,
    children: [
      { path: 'registerclient', element: <RegisterClient /> },
      { path: 'clientClinicalDetails', element: <ClientClinicalDetailsPage /> },
      { path: 'account', element: <Account /> },
      { path: 'adduser', element: <RegisterUserPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'defaulters', element: <ReportDefaulters /> },
      { path: 'addchv', element: <AddCHVPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/registerclient" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
