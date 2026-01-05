import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../components/Home/Home.jsx";
import AllJobs from "../components/AllJobs/AllJobs.jsx";
import Register from "../components/Register/Register.jsx";
import AddAJobs from "../components/AddAJobs/AddAJobs.jsx";
import MyAcceptedTasks from "../components/MyAcceptedTasks/MyAcceptedTasks.jsx";
import ViewDetails from "../components/ViewDetails/ViewDetails.jsx";
import UpDate from "../components/update/UpDate.jsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import MyJobs from "../components/MyJobs/MyJobs.jsx";
import MyApplications from "../components/MyApplications/MyApplications.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import DashboardHome from "../components/Dashboard/DashboardHome.jsx";
import ProfilePage from "../components/Dashboard/ProfilePage.jsx";
import AboutPage from "../components/Pages/AboutPage.jsx";
import ContactPage from "../components/Pages/ContactPage.jsx";
import BlogPage from "../components/Pages/BlogPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // public shell
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "allJobs", element: <AllJobs /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "addJob", element: <PrivateRoute><AddAJobs /></PrivateRoute> },
      { path: "myAcceptedTasks", element: <PrivateRoute><MyAcceptedTasks /></PrivateRoute> },
      { path: "myJobs", element: <PrivateRoute><MyJobs /></PrivateRoute> },
      { path: "myApplications", element: <PrivateRoute><MyApplications /></PrivateRoute> },
      { path: "viewDetails/:id", element: <ViewDetails /> },
      { path: "updateJob/:id", element: <PrivateRoute><UpDate /></PrivateRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "my-jobs", element: <MyJobs dashboard={true} /> },
      { path: "my-applications", element: <MyApplications dashboard={true} /> },
      { path: "add-job", element: <AddAJobs dashboard={true} /> },
    ],
  },
]);
