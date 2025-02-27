import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { GiBasket } from "react-icons/gi";
const Account = ({setSignedin}) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setSignedin(false); 
    navigate('/Signup'); 
  };
  return (
    <div className='account-container'>
      <h2>Your profile</h2>
      <div className='account-title'>
        <p className='name'>Name:John</p>
         <p className='name'>Email:john@gmail.com</p>
         <p className='name'>Phone:789765432</p>
         <p className='name'>Address:Chennai,Tamilnadu,india-600001</p>
      </div>
      <Link to={`/Wishlist`}> <button className='account-button'><CiHeart /> Wishlist</button></Link> 
      <Link to={`/Basket`}><button className='account-button'><GiBasket />Basket</button></Link>
      
      <div>
     <button className='logout-button' onClick={handleLogout}>Log out</button>
      </div>
    </div>
    
  )
}

export default Account
