import { useState } from 'react';
import { Link, NavLink, useNavigate,useSearchParams } from 'react-router';
import logoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import { getCartItemQuantity } from '../utils/getCartItemsQuantity';
import './header.css';

export function Header({cart}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const searchText = searchParams.get('search');

  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event)=>{
    setSearch(event.target.value)
  }
  
  const searchProducts = ()=>{
    navigate(`/?search=${search}`)
  }
  
  const searchOnKeyPress = (event)=>{
    switch(event.key){
      case 'Enter':
        searchProducts();
      break;
    }
  }
  
  let totalCartQuantity = getCartItemQuantity(cart);
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={logoWhite} />
            {/* <span className='logoName'>Gulal.</span>     */}
            <img className="mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearchInput} onKeyDown={searchOnKeyPress}/>

          <button className="search-button" onClick={searchProducts} >
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalCartQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
