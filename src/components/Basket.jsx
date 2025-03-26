import React, { useState, useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";


function Basket () {

  const [cart, setCart] = useState([]); 
  const navigate = useNavigate();

 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    console.log(storedCart,"storedCart")
  }, []); 

  
  
  const handleDelete = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };
  
  const handleIncrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { 
          ...item, 
          productQty: (item.productQty || 1) + 1, 
          price: item.basePrice * ((item.productQty || 1) + 1) // Use basePrice instead of item.price
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const handleDecrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.productQty > 1) {
        return { 
          ...item, 
          productQty: item.productQty - 1, 
          price: item.basePrice * (item.productQty - 1) // Correct price calculation
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const calculateTotalPrice = (item) => {
    console.log(item.basePrice,"price");
    return item.productQty * item.basePrice; 
  };
  
  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map(item => ({
      ...item,
      basePrice: item.basePrice || item.price, // Ensure basePrice is set
      productQty: item.productQty || 1
    }));
    setCart(updatedCart);
  }, []);
  
  if (cart.length === 0) {
    return <h3>Your cart is empty</h3>;
  }
 

  return (
    <div className="basket-container">
      <h3 className="basket-h3"> Your Cart Items</h3>
      
      {cart.map((item) => (
        <div key={item.id} className="basket-item">
          <img src={item.thumbnail} alt={item.title} width="100" />
          <h2>{item.title}</h2>
          <h3>${calculateTotalPrice(item)}</h3>
         
          <div className="Basket-controls">
            <button className="button-" onClick={() => handleDecrement(item.id)}>-</button>
            <span>{item.productQty}</span>
            <button className="button1" onClick={() => handleIncrement(item.id)}>+</button>
          </div>
        
          <Link to={`/Buynow/${item.id}?qty=${item.productQty}`}>
            <button className="basket1-button" onClick={() => navigate(`/Buynow/${item.id}?qty=${item.productQty}`)}>Buy now</button>
          </Link>
          
          <button className="basket-button"onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}

      <Link to="/Store">
        <button className="basket-delete-button">Back to Store</button>
      </Link>
    </div>
  );
};

export default Basket;
