import axios from "axios";
import { formatCurrency } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({cartItem, loadCart}) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false)

  const [quantity, setQuantity] = useState(cartItem.quantity)

  const deleteCartItem = async ()=>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart();
  }
  
  const updateQuantity = async ()=> {

    await axios.put(`/api/cart-items/${cartItem.productId}`,{
      quantity: Number(quantity)
    })

    await loadCart();

    setIsUpdatingQuantity(prev => !prev) // toggle the inputbox with quantity
  }

  const updateCartItem = (event)=>{
    setQuantity(event.target.value)
  }

  const updateByPressingKey = (event)=>{
    switch(event.key){
      case 'Enter':
        updateQuantity();
      break;
      case 'Escape':
        setQuantity(cartItem.quantity);
        setIsUpdatingQuantity(false)
      break
    }
  }
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatCurrency(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{ isUpdatingQuantity 
            ? <input type="text" className="update-input-box" value={quantity} onChange={updateCartItem} onKeyDown={updateByPressingKey}/>
            : <span className="quantity-label">{cartItem.quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity}>Update</span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>Delete</span>
        </div>
      </div>
    </>
  );
}
