import { Link } from "react-router-dom";
import "../styles/App.css"

function HomePage() {
    return (
        <section className="homepage">
            <div className="hero">
                <h1>Coffee R Us</h1>
                <p>The go to store for all your coffee needs!</p>
                <Link to="/shop" className="browse-btn">Browse Coffee</Link>
            </div>
        </section>
    )
}

export default HomePage; 