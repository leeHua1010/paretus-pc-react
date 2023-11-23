import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("~/layout"));
const NotFound = lazy(() => import("~/components/not-found"));
const Home = lazy(() => import("~/pages/home"));
const Login = lazy(() => import("~/pages/login"));
const Register = lazy(() => import("~/pages/register"));
const CreateArticle = lazy(() => import("~/pages/create-article"));
const ArticleDetail = lazy(() => import("~/pages/article-detail"));
const Profile = lazy(() => import("~/pages/profile"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/article",
    element: <Layout />,
    children: [
      { path: "create", element: <CreateArticle /> },
      { path: "detail", element: <ArticleDetail /> },
    ],
  },
  {
    path: "/profile",
    element: <Layout />,
    children: [{ path: "info", element: <Profile /> }],
  },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },

  { path: "*", element: <NotFound /> },
];

export default function Router() {
  return useRoutes(routes);
}
