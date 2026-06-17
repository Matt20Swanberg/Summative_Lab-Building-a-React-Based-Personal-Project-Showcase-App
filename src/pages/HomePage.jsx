import { Link } from "react-router-dom";
import "../styles/App.css"

// Landing page for the app with a call-to-action that routes users to the shop
function HomePage() {
    return (
        <section className="homepage">
            <div className="hero">
                <h1>Coffee R Us</h1>
                <p className="home-description">The go to store for all your coffee needs!</p>
                <Link to="/shop" className="browse-btn">Browse Coffee</Link>
            </div>
        </section>
    )
}

export default HomePage; 