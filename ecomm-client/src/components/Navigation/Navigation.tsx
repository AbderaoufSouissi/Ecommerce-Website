import { Link, NavLink } from "react-router-dom";
import AccountIcon from "../common/AccountIcon";
import CartIcon from "../common/CartIcon";
import Wishlist from "../common/Wishlist";
import "./Navigation.css"

const Navigation = () => {
  return (
    <nav className="flex items-center py-6 px-8 justify-between gap-40">
      <div className="flex items-center gap-6">
        {/* LOGO */}
        <a href="/" className="text-3xl text-black gap-8 font-bold">
          TnGarments
        </a>
      </div>

      <div className="flex-wrap items-center gap-10 flex-1">
        {/* NAV ITEMS */}
        <ul className="flex gap-14 text-gray-700 hover:text-black">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Shop</NavLink>
          </li>
          <li>
            <NavLink to="/men" className={({isActive}) => isActive ? "active-link" : ""}>Men</NavLink>
          </li>
          <li>
            <NavLink to="/women" className={({isActive}) => isActive ? "active-link" : ""}>Women</NavLink>
          </li>
          <li>
            <NavLink to="/kids" className={({isActive}) => isActive ? "active-link" : ""}>Kids</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        {/* SEARCH BAR */}
        <div className="border rounded flex items-center overflow-hidden">
          <button className="flex items-center justify-center px-4 text-gray-500">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <input type="text" className="px-4 py-2 outline-none" placeholder="Search..."/>
        
        </div>
      
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* ACTION ITEMS icons */}
        <ul className="flex items-center gap-8">
          <li><button><Wishlist/></button></li>
          <li><button><AccountIcon/></button></li>
          <li><Link to={"/cart-items"}><CartIcon/></Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
