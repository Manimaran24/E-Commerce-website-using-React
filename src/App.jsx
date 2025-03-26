import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Account from './components/Account';
import Wishlist from './components/Wishlist';
import Basket from './components/Basket';
import View from './components/View';
import Buynow from './components/Buynow';
import Cod from './components/Cod';
import Upi from './components/Upi';
import Signin from './components/Signin';
import Signup from './components/Signup';

import './App.css'


function App() {
       const[query, setQuery]=useState("");
   
      const [Signedin, setSignedin] = useState(() => {
        return JSON.parse(localStorage.getItem("Signedin") || "false");
      });
      
      useEffect(() => {
        localStorage.setItem("Signedin", JSON.stringify(Signedin));
      }, [Signedin]);
      
  return (
    
  <BrowserRouter>
{!Signedin?(
  <Routes>
  <Route path="/" element={<Signin setSignedin={setSignedin}/>} />
  <Route path="/Signup" element={<Signup />} />
  </Routes>
) :(
  <>
  {/* props */}
  <Navbar  setQuery={setQuery} query={query}/>      

    <Routes>
      <Route path='/Store' element={<Home query={query}  />}></Route>
      <Route path='/Account' element={<Account setSignedin={setSignedin} />}></Route>
      <Route path='/Wishlist' element={<Wishlist />}></Route>
      <Route path="/Basket" element={<Basket />}></Route>
      <Route path='/View/:id' element={<View />}></Route>
      <Route path="/Buynow/:id" element={<Buynow />} />
      <Route path="/Cod/:id" element={<Cod />} />
      <Route path="/Upi/:id" element={<Upi />} />
    </Routes>
    </>
)}
    </BrowserRouter>
  )
}

export default App
