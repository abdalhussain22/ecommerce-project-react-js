import { Routes,Route } from "react-router"
import axios from "axios"
import { useState,useEffect } from "react"
import { HomePage } from './pages/HomePage'
import { Checkout } from "./pages/checkout/CheckoutPage"
import { Orders } from "./pages/OrdersPage"
import { Tracking } from "./pages/TrackingPage"
import { ErrorPage } from "./pages/Error404Page"


function App() {
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        axios.get('/api/cart-items')
            .then((response)=>{
                setCart(response.data)
            })
    },[])
    
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart}/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  )
}

export default App
