import { NavLink } from "react-router-dom";
import "../styles/App.css"

// Main navigation links for moving between the homepage, shop, and admin portal
function NavBar() {
    return (
        <nav>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/shop" className="nav-link">Shop</NavLink>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
        </nav>
    );
}

export default NavBar;