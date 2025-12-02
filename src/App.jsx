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

    window.axios = axios; // when we try axios.post('/api/reset') in console . this line will reset the cart to defualt values.
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} loadCart={loadCart}/>} />
        <Route path="/orders" element={<Orders cart={cart} loadCart={loadCart} /> } />
        <Route path="/tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
        <Route path="*" element={<ErrorPage cart={cart}/>} />
      </Routes>
    </>
  )
}

export default App
