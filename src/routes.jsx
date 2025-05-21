import { createBrowserRouter } from "react-router-dom";
import MAINLAYOUT from "./layout/MAINLAYOUT";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Reigster from "./pages/register/Reigster";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";

const route = createBrowserRouter([
  {
    path: '/',
    element: <MAINLAYOUT />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
        {
        path: '/shop',
        element: <Shop/>,
      },
        {
        path: '/Reg',
        element: <Reigster/>,
      },
        {
        path: '/login',
        element:<Login/>
      },
       {
        path: '/cart',
        element:<Cart/>
      },
    ],
  },
]);

export default route;
