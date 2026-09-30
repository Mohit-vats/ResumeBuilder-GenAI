import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Protected from "./components/Protected";
import Home from "./features/ai/pages/home";
import Report from "./features/ai/pages/report";

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
  },
  {
    path: "/report/:interviewID",
    element: <Protected>
      <Report />
    </Protected>
  }
  // {
  //   path: "/interview",
  //   element : <Protected>
  //     <Report/>
  //   </Protected>
  // }
]);


export default router;
