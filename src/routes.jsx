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
import Protectedrouter from "./components/protectedrouter/Protectedrouter";
import Homepage from "./pages/Homepage/Homepage";
import Categoriespages from "./pages/categories/Categoriespages";
import Proudctpages from "./pages/proudct/Proudctpages";
import Contactuspages from "./pages/contactus/Contactuspages";
import Aboutuspages from "./pages/aboutus/Aboutuspages";

// الصفحات الجديدة تحت /profile
import Information from "./pages/ACount/Information";
import ChangePassword from "./pages/ACount/ChangePassword";
import Orders from "./pages/ACount/Orders";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MAINLAYOUT />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/shop", element: <Shop /> },
      { path: "/register", element: <Reigster /> },
      {
        path: "/checkout",
        element: (
          <Protectedrouter>
            <Checkout />
          </Protectedrouter>
        ),
      },
      { path: "/login", element: <Login /> },
      {
        path: "/cart",
        element: (
          <Protectedrouter>
            <Cart />
          </Protectedrouter>
        ),
      },
      { path: "/forgetpassworld", element: <ForgetPassword /> },
      { path: "/restcode", element: <Restcode /> },
      { path: "/home", element: <Homepage /> },
      { path: "/categories", element: <Categoriespages /> },
      { path: "/products", element: <Proudctpages /> },
      { path: "/aboutus", element: <Aboutuspages /> },
      { path: "/contactus", element: <Contactuspages /> },

      // 🟩 صفحات البروفايل بشكل مباشر تحت /profile
      { path: "/profile/info", element: <Information /> },
      { path: "/profile/change-password", element: <ChangePassword /> },
      { path: "/profile/orders", element: <Orders /> },
    ],
  },
]);

export default route;
