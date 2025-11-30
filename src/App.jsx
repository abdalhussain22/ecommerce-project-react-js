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

    useEffect(()=>{
      const fetchAppData = async () =>{

      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
      }

      fetchAppData();
    },[])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart}/>} />
        <Route path="/orders" element={<Orders cart={cart}/>} />
        <Route path="/tracking" element={<Tracking cart={cart}/>} />
        <Route path="*" element={<ErrorPage cart={cart}/>} />
      </Routes>
    </>
  )
}

export default App
