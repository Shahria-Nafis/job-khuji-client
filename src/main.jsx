import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoodLayout from './layout/RoodLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllJobs from './components/AllJobs/AllJobs.jsx';
import Register from './components/Register/Register.jsx';
import AddAJobs from './components/AddAJobs/AddAJobs.jsx';
import MyAcceptedTasks from './components/MyAcceptedTasks/MyAcceptedTasks.jsx';
import ViewDetails from './components/ViewDetails/ViewDetails.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import UpDate from './components/update/UpDate.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import MyJobs from './components/MyJobs/MyJobs.jsx';
import MyApplications from './components/MyApplications/MyApplications.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RoodLayout,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, Component: Home },
      { path: "allJobs", Component: AllJobs },
      { path: "register", Component: Register },
      { path: "addaJob", Component: AddAJobs },
      { path: "myAcceptedTasks", Component: MyAcceptedTasks },
      { 
        path: "myJobs", 
        element: <PrivateRoute><MyJobs /></PrivateRoute>
      },
      { 
        path: "myApplications", 
        element: <PrivateRoute><MyApplications /></PrivateRoute>
      },
      { 
        path: "viewDetails/:id", 
        element: <PrivateRoute><ViewDetails /></PrivateRoute>
      },
      { 
        path: "updateJob/:id", 
        element: <PrivateRoute><UpDate /></PrivateRoute>
      },
      {
        path: "*",
        Component: NotFound
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

