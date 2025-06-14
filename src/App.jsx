import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem("tira-auth") ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    ),
  },
]);
