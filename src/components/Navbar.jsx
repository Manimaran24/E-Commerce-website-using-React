
import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; 
import { useState } from "react";
import "../App.css";

function Navbar({ query, setQuery }) {
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const [menu, setMenu] = useState(false);

  const handleNavClick = () => {
    setMenu(false);
  };

  return (
    <div className="navbar">
      <h2>QuickCart</h2>
      <div className="search">
        <input
          type="text"
          value={query}
          className="searchbar"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <div className="menubutton" onClick={() => setMenu(!menu)}>
        {menu ? <IoClose />: <IoMenu/>}
      </div>
      <div className={`nav-menu ${menu ? "open" : ""}`}>
        <ul>
          <li className="nav" onClick={handleNavClick}>
            <Link to="/">Store</Link>
          </li>
          <li className="nav1" onClick={handleNavClick}>
            <Link to="/Account">Account</Link>
          </li>
          <li className="nav2" onClick={handleNavClick}>
            <Link to="/Wishlist">Wishlist</Link>
          </li>
          <li className="nav3" onClick={handleNavClick}>
            <Link to="/Basket">
              Basket <span><FaShoppingBasket /></span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
