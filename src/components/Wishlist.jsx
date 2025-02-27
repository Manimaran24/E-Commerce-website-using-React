import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Wishlist = () => {
  const [list, setList]=useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setList(storedWishlist);
}, []);

// Fetch product detail
useEffect(() => {
    if (list.length > 0) {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                const wishlistProducts = data.products.filter((product) =>
                    list.includes(product.id)
                );
                setProducts(wishlistProducts);
            })
            .catch((err) => console.log(err));
    }
}, [list]);
const removeFromWishlist = (productId) => {
  const updatedWishlist = list.filter((id) => id !== productId);
  setList(updatedWishlist);
  // setProducts(products.filter((product) => product.id !== productId));
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
};

  return (
    <div className="wishlist-container">
    <h3>Wishlist</h3>
    
    {products.map((item) => (
      <div key={item.id} className="wishlist-item">
        <img src={item.thumbnail} alt={item.title} width="100" />
        <h2>{item.title}</h2>
        <h3>${item.price}</h3>

        <Link to={`/Buynow/${item.id}`}>
          <button className="wishlist1-button" onClick={() => navigate(`/Buynow/${item.id}`)}>Buy now</button>
        </Link>
        
        <button className="wishlist-button"onClick={() => removeFromWishlist(item.id)}>Delete</button>
      </div>
    ))}

    <Link to="/">
      <button className="wishlist-delete-button">Back to Store</button>
    </Link>
  </div>
  )
}

export default Wishlist
