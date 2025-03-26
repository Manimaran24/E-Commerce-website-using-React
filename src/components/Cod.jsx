import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
// import "./Cod.css";


const Cod = () => {
    const{id}=useParams();
    const[cod,setCod]=useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productQty = parseInt(queryParams.get("qty")) || 1;

         const [formData, setFormData] = useState({
                name: '',
                phone: '',
                address: '',
            });
                const [error, setError] = useState({
                    name: '',
                    phone: '',
                    address: ''
                });
            const validateForm = () => {
                let valid = true;
                let newError = { name: '', phone: '', address: '' };
        
                // Name Validation
                if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
                    newError.name = 'Name must contain only letters';
                    valid = false;
                } else if (formData.name.trim().length < 3) {
                    newError.name = 'Name must be at least 3 characters';
                    valid = false;
                }
                if (!/^\d{10}$/.test(formData.phone.trim())) {
                    newError.phone = 'Phone number must be exactly 10 digits';
                    valid = false;
                }
            
                // Address Validation
                if (formData.address.trim().length < 5) {
                    newError.address = 'Address must be at least 5 characters';
                    valid = false;
                }
            
                setError(newError);
                return valid;
            };
            const handleChange = (e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
            };
        
            const handleSubmit = (e) => {
                e.preventDefault();
        
                if (!validateForm()) {
                    alert("Please fill the details. Order not placed!");
                    return; //stop
                    
                  
                }else{
                    alert("Order placed successfully!");
                }
        
        
                
                localStorage.setItem('user', JSON.stringify(formData));
                
                navigate('/');
            };
        
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setCod(data))
            .catch(err => console.log(err));
    }, [id]);
    const handlePlaceOrder = () => {

        fetch("https://dummyjson.com/carts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: 1,
                products: [{ id: cod.id, quantity: 1 }],
                paymentMethod: "COD"
            })
        })
            .then(res => res.json())
            
            
        }
  return (
    <div className="cod-container">
    <h3 className="cod-title">Cash on Delivery</h3>
    
    <img className="cod-image" src={cod.thumbnail} alt={cod.title} width="150" />
    
    <h2 className="cod-product-name">{cod.title}</h2>
    
    <h3 className="cod-price">Price: ${cod.price*productQty}</h3>
    <form onSubmit={handleSubmit}> 
    <input className="upi-name"
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
            />
 <span className="error">{error.name}</span>
          
            <input className="upi-phonenumber"
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
            />
 <span className="error">{error.phone}</span>
            <textarea className="upi-address"
            name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
            />
     <span className="error">{error.address}</span>
     <br></br>
    <button className="cod-order-button" onClick={handlePlaceOrder}>Place Your Order</button>
    
    < button type='button' className="cod-cancel-button" onClick={() => navigate("/Store")}>Cancel</button>
    </form>
</div>

  )
  
}

export default Cod
