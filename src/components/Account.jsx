import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { GiBasket } from "react-icons/gi";

const Account = ({ setSignedin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loginUser'); 
    localStorage.setItem('Status', 'false'); // Set login status to false
    setSignedin(false); 
    navigate('/'); 
  };

  return (
    <div className='account-container'>
    <h2>Your Profile</h2>
    {user ? (
      <div className='account-title'>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}

    <Link to={`/Wishlist`}>
      <button className='account-button'><CiHeart /> Wishlist</button>
    </Link> 
    <Link to={`/Basket`}>
      <button className='account-button'><GiBasket /> Basket</button>
    </Link>

    <div>
      <button className='logout-button' onClick={handleLogout}>Log out</button>
    </div>
  </div>
  );
};

export default Account;
