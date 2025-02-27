import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

function Basket () {
  const { id } = useParams();
  const [cart, setCart] = useState([]); // Cart state as an array
  const navigate = useNavigate();

 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []); 

  
  const handleDelete = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

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
          <h3>${item.price}</h3>

          <Link to={`/Buynow/${item.id}`}>
            <button className="basket1-button" onClick={() => navigate(`/Buynow/${item.id}`)}>Buy now</button>
          </Link>
          
          <button className="basket-button"onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}

      <Link to="/">
        <button className="basket-delete-button">Back to Store</button>
      </Link>
    </div>
  );
};

export default Basket;
