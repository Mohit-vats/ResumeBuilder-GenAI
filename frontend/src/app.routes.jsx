import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);


export default router;