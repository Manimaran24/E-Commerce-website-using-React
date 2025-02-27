import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import "./Home.css";

function Home({ query }) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 12;
    const totalPages = Math.ceil(data.length / postPerPage);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || []; // Ensure it starts as an array
    });


    const paginate = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);

        }
    };
    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setCategories(data.map((category) => ({
                        name: category.name || category,
                        slug: category.slug || category
                    })));
                }
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        let url = category
            ? `https://dummyjson.com/products/category/${category}`
            : "https://dummyjson.com/products";


        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data.products))
            .catch((err) => console.log(err));
    }, [category]);


    const fpost = data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) || product.price.toString().includes(query)
        || product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.rating?.toString().includes(query) || product.description?.toLowerCase().includes(query.toLowerCase())

    );
    const currentPosts = fpost.slice(indexOfFirstPost, indexOfLastPost);
    const handleChange = (event) => {
        setCategory(event.target.value);
        setCurrentPage(1);
    };
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
        <div>
            <select className="dropdown" onChange={handleChange}>
                <option value="">-- Select a Category --</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.slug}>{category.name}</option>
                ))}
            </select>
            <div className="testimonial">
                <ul className="api1">
                    {currentPosts.map((product) => (
                        <li key={product.id} onClick={() => navigate(`/View/${product.id}`)}
                            style={{ cursor: "pointer" }} >
                            <button className="heart" onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product.id);
                            }}>
                                {wishlist.includes(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                            </button>
                            <img src={product.thumbnail} alt={product.title} width="100" />
                            <div className="productname">
                                <strong>{product.title}</strong>
                                <p>{product.description.substring(0, 50)}</p>
                                <h3>${product.price}</h3>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            style={{ fontSize: "10px", color: star <= product.rating ? "gold" : "gray" }}
                                        >
                                            <IoStar />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} >  ⬅️ </button>
                {new Array(totalPages).fill(1).map((_, index) => {
                    return <button className="btn"
                        key={index + 1}
                        onClick={() => paginate(index + 1)} >
                        {index + 1}
                    </button>
                })}
                <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)} > ➡️ </button>


            </div>
        </div>

    );
};

export default Home;
