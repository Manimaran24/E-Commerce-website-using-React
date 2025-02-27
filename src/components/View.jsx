import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
// import './View.css'
function View() {
  const { id } = useParams();//
  const [view, setView] = useState({})
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || []; // Ensure it starts as an array
  });
  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setView(data))
      .catch(err => console.log(err))
  }, [id]);
  const addCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const ProductCart = cart.find((item) => item.id === view.id)//
    if (!ProductCart) {
      cart.push(view);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("add to cart succssfully");
    } else {
      alert("already in cart");
    }
  }
  const toggleWishlist = (productId) => {
    let updatedWishlist = [...wishlist]; //copy

    if (updatedWishlist.includes(productId)) {
      updatedWishlist = updatedWishlist.filter(id => id !== productId); // Remove
    } else {
      updatedWishlist.push(productId); // Add
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to localStorage
  };
  return (

    <div className="view">
      <h3>Product Detail</h3>
      <button className="heart1" onClick={(e) => {
        e.stopPropagation();
        toggleWishlist(view.id);
      }}>
        {wishlist.includes(view.id) ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
      <img src={view.thumbnail} alt={view.title} width="150" />
      <h2>{view.title}</h2>
      <p>{view.description}</p>
      <h3 className="price">${view.price}</h3>
      {view.dicountPercentage}
      <p>
        {`Rating: ${view.rating} | `}
        {`Stock: ${view.stock} | `}
        {`Brand: ${view.brand} | `}

        {`Warranty: ${view.warrantyInformation} | `}
        {`Shipping: ${view.shippingInformation} | `}
        {`Availability: ${view.availabilityStatus} | `}
        {`returnPolicy:${view.returnPolicy}`}

      </p>

      <div className="view1">
        <button onClick={addCart}>Add to cart</button>

        < Link to={`/Buynow/${id}`}><button onClick={() => Navigate(`Buynow/${id}`)}>Buy now</button></Link>
        <Link to="/"><button><FaCircleArrowLeft /></button></Link>

      </div>

    </div>
  )
}

export default View
