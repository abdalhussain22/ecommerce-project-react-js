export function getCartItemQuantity(cart){
    let totalCartQuantity = 0;

    cart.forEach((cartItems) => {
      totalCartQuantity += cartItems.quantity;
    });

    return totalCartQuantity;
}