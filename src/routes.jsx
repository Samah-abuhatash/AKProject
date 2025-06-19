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

import Checkout from "./pages/checkout/Checkout";
import Product from "./pages/Deatilesproudct/Proudct";

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
        element:<Product/>
      },
        {
        path: '/shop',
        element: <Shop/>,
      },
        {
        path: '/register',
        element: <Reigster/>,
      },
      ,
        {
        path: '/checkout',
        element: <Checkout/>,
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
