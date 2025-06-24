import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const Cartcontext=createContext(null);
const  Cartcontextprovider=({children })=>{
    const [cartitem,setcartitem]=useState(0);
    const [totalPrice,setTotalPrice]=useState(0);


    const getchCart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        'https://mytshop.runasp.net/api/Carts',
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      if (response.status==200){
       // console.log("nmber of cart item ",response.data.cartResponse.length)
         //       console.log("totalprice",response.data.totalPrice)
 
        setcartitem(response.data.cartResponse.length);
        console.log("res.data.cartResponse.length", response.data.cartResponse.length)
        setTotalPrice(response.data.totalPrice);

      //console.log("✅ Cart count fetched successfully.");
      // setProducts(response.data.cartResponse || []);
      //setTotalPrice(response.data.totalPrice);
      
     
      }
     
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
useEffect(()=>{getchCart()},[])
    return( <Cartcontext.Provider value={{cartitem,setcartitem,totalPrice,setTotalPrice}}>
        {children }
    </Cartcontext.Provider>);
   


}
export default Cartcontextprovider;

