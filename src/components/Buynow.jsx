import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import { useNavigate ,useLocation} from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

const Buynow = () => {
    const { id } = useParams();
    const [buy, setBuy] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("");
    const [upiId, setUpiId] = useState("");
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);//(URLSearchParams is a built in javascript library that extract the values,location.search is a query parameter)
    const productQty = parseInt(queryParams.get("qty")) || 1;
    useEffect(() => {

        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setBuy(data))
            .catch(err => console.log(err));
    }, [id]);
    const handleplaceOrder = () => {
        if (paymentMethod === "UPI" && (!upiId || !amount)) {
            alert("please enter a upi id and amount");
            return;
        }
        fetch("https://dummyjson.com/carts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: 1,
                products: [{ id: buy.id, quantity: 1 }],
                paymentMethod: paymentMethod,
                upiId: paymentMethod === "UPI" ? upiId : null,
                amount: paymentMethod === "UPI" ? amount : buy.price
            })
        })
            .then(res => res.json())
            .then(data => {

                alert("Order placed successfully!");
                navigate("/");
            })
            .catch(err => {

                console.error("Order failed", err);
            });
    }
    return (
        <div className="buynow-container"> 
        <h3 className="buynow-title">Confirm Your Order</h3> 
        
        <img className="buynow-image" src={buy.thumbnail} alt={buy.title} width="150" /> 
        
        <h2 className="buynow-product-name">{buy.title}</h2> 
        
        <h3 className="buynow-price">Total Price: ${buy.price * productQty}</h3> 
        
        <p className="buynow-offer">Offer: {buy.discountPercentage}</p> 
        
        <div className="payment-options">
            <Link to={`/cod/${buy.id}?qty=${productQty}`}><button className="cod-button" onClick={() => navigate(`/Cod/${id}`)}>Cash on Delivery</button> </Link>
            
            <Link to={`/upi/${buy.id}?qty=${productQty}`}>  <button className="upi-button" onClick={() => navigate(`/upi/${id}`)}>UPI Payment</button> </Link>
            
            <Link to={`/View/${id}`}>
                <button className="back-button"><FaCircleArrowLeft /></button>
            </Link> 
        </div> 
    </div>
    
    )
}

export default Buynow

