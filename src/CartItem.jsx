import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const numericCost = parseFloat(item.cost.substring(1));
      const subtotal = item.quantity * numericCost;
      total += subtotal;
    });
    // 5. Devuelve el total acumulado
    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault(); // evita comportamiento por defecto del botón
    onContinueShopping(e); // llama a la función pasada desde el padre
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  


  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1){
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity - 1
        }));
    }else{
        dispatch(removeItem({name: item.name}))
    }
    
  };

  const handleRemove = (item) => {
    dispatch(removeItem({name: item.name}))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let item_total = item.quantity * parseFloat(item.cost.substring(1));
    return item_total
  };

  return (
    <div className="cart-container">
      {/* 1. Encabezado con totales */}
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <h3 style={{ color: 'black' }}>
        Total Items: {calculateTotalItems()}
      </h3>

      {/* 2. Lista de productos */}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              {/* 3. Control de cantidad */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* 4. Subtotal del producto */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              {/* 5. Botón eliminar */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Botones de navegación */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};



export default CartItem;


