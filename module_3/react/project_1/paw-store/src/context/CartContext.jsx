import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // state to manage the cart items
  const [cartItems, setCartItems] = useState([]);
  // state to manage the total price of the cart
  const [totalPrice, setTotalPrice] = useState(0);

  // update the total price whenever the cart items change
  useEffect(() => {
    const nextTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    setTotalPrice(nextTotal);
  }, [cartItems]);

  // method to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
                subtotal: (item.cantidad + 1) * item.precio,
              } // update subtotal when quantity changes
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            nombre: product.nombre,
            imagen: product.imagen, // add image for display in the cart
            cantidad: 1,
            precio: product.precio,
            subtotal: product.precio * 1, // initial subtotal is price * quantity (1)
          },
        ];
      }
    });
  };

  // method to remove a product from the cart by id
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // method to increase the quantity of a product in the cart by id
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: (item.cantidad + 1) * item.precio,
            }
          : item
      )
    );
  };

  // method to decrease the quantity of a product in the cart by id
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad > 1 ? item.cantidad - 1 : 1,
              subtotal:
                (item.cantidad > 1 ? item.cantidad - 1 : 1) * item.precio,
            }
          : item
      )
    );
  };

  // method to clear the cart of all items
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  // calculate the total number of items in the cart
  const cartTotalItems = cartItems.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
