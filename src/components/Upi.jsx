
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
const Upi = () => {
    const { id } = useParams();
    const [upi, setUpi] = useState({});

    const [qrCode, setQrCode] = useState(""); // Store QR Code image URL
    
    const navigate = useNavigate();
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


    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setUpi(data))
            .catch(err => console.log(err));
    }, [id]);

    // Function to Generate UPI Payment QR Code
    const generateQrCode = () => {
        if (!validateForm() ) {
            alert("Please fill in all details before generating the QR code.");
            return;
        }
       
        const totalPrice = upi.price; // Get price from API response
        const upiUrl = `upi://pay?pa=Testupi@techgenzi&pn=Merchant&mc=1234&tid=Txn001&tr=Order${id}&am=${totalPrice}&cu=INR`;

        // Generate QR Code Image
        QRCode.toDataURL(upiUrl, { width: 200 }, (err, url) => {
            if (err) {
                
                console.error(err);
            } 
            else{
                setQrCode(url);
            }
            
        });
    };

    const handleplaceOrder = () => {
        if (!validateForm()) {
            alert("Please fill in all details before placing your order.");
            return;
        }

        fetch("https://dummyjson.com/carts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 1,
                products: [{ id: upi.id, quantity: 1 }],
                paymentMethod: "UPI",
                upiId: "Testupi@techgenzi", 
                amount: upi.price, 
                name: name,
                phone: phone,
                address: address
            })
        })
            .then(res => res.json())
           
    };

    return (
        <div className="upi-container">
            <h4>Enter Payment & Personal Details</h4>

            <img className="upi-image" src={upi.thumbnail} alt={upi.title} width="150" />
            <h2 className="upi-product-name">{upi.title}</h2>
            <h3 className="upi-price"> ₹{upi.price}</h3> {/* Render amount from API */}

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
           

            {/* /* Display QR Code if generated */ }
            {qrCode && (
                <div className="upi-qrcode-container">
                    <h4>Scan the QR Code to Pay</h4>
                    <img src={qrCode} alt="UPI QR Code" width="200" />
                    <p className="upi-statement">Use GPay or any UPI app to scan and pay</p>
                    <h2 className="upi-return">Return policy</h2>
                    <p className="upi-reurn-policy">Returns accepted within 15-30 days, items must be unused, original packaging required, return shipping paid by customer, refunds processed after verification. </p>
                </div>
            )}
            <div className="upi-buutons">
  <button className="upi-qrcode-button" onClick={generateQrCode}>
                 QR Code
            </button>
            <button className="upi-orderbutton" onClick={handleplaceOrder}>
                Place Your Order
            </button>
            <button className="upi-cancelbutton" onClick={() => navigate("/")}>Cancel</button>
            </div>
        </div>
    );
};

export default Upi;
