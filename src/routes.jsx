import { createBrowserRouter } from "react-router-dom";
import MAINLAYOUT from "./layout/MAINLAYOUT";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Reigster from "./pages/register/Reigster";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ForgetPassword from "./pages/forgentpassworld/Forgetpassworld";
import Restcode from "./pages/forgentpassworld/Restcode";
import Detlisp from "./pages/Deatilesproudct.jsx/Proudct";
import Proudct from "./pages/Deatilesproudct.jsx/Proudct";

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
      ,
       {
        path: '/product/:id',
        element:<Proudct/>
      },
        {
        path: '/shop',
        element: <Shop/>,
      },
        {
        path: '/register',
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
       {
        path: '/forgetpassworld',
        element:<ForgetPassword/>
      },
       {
        path: '/restcode',
        element:<Restcode/>
      },
    
    
    ],
    
    
  },
]);

export default route;
