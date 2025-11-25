import { Routes,Route } from "react-router"
import { HomePage } from './pages/HomePage'
import { Checkout } from "./pages/checkout/CheckoutPage"
import { Orders } from "./pages/OrdersPage"
import { Tracking } from "./pages/TrackingPage"
import { ErrorPage } from "./pages/Error404Page"

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  )
}

export default App
