import { Routes,Route } from "react-router"
import axios from "axios"
import { useState,useEffect } from "react"
import { HomePage } from './pages/home/HomePage'
import { Checkout } from "./pages/checkout/CheckoutPage"
import { Orders } from "./pages/orders/OrdersPage"
import { Tracking } from "./pages/TrackingPage"
import { ErrorPage } from "./pages/Error404Page"


function App() {
    const [cart,setCart] = useState([]);

    const loadCart = async () =>{
      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
    }

    useEffect(()=>{
      loadCart();
    },[])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart}/>} />
        <Route path="/orders" element={<Orders cart={cart}/>} />
        <Route path="/tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
        <Route path="*" element={<ErrorPage cart={cart}/>} />
      </Routes>
    </>
  )
}

export default App
