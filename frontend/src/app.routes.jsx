import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Protected from "./components/Protected";
import Home from "./features/ai/pages/home";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <Protected>
      <Home/>
    </Protected>
  }
]);


export default router;