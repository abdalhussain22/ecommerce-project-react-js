import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";
import { getCartItemQuantity } from "../../utils/getCartItemsQuantity";

export function Checkout({ cart,loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  let totalCartQuantity = getCartItemQuantity(cart);

  useEffect(() => {
    const fetchCheckoutData = async () =>{
      let response = await axios
        .get("/api/delivery-options?expand=estimatedDeliveryTime")
          setDeliveryOptions(response.data);
    }

    fetchCheckoutData();
  }, []);

  useEffect(()=>{
    const fetchPaymentSummary = async()=>{
      let response = await axios.get("/api/payment-summary")
          setPaymentSummary(response.data);
      }
      fetchPaymentSummary();
  },[cart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Checkout Items</title>
      <CheckoutHeader totalCartQuantity={totalCartQuantity}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}
