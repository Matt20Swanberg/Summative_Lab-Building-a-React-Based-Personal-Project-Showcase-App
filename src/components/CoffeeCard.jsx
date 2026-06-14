function CoffeeCard({ coffee }) {

    return (
        <div className="coffee-card">
            <h2>{coffee.name}</h2>
            <p>{coffee.description}</p>
            <p>{coffee.origin}</p>
            <p>{coffee.price}</p>
        </div>
    )
}

export default CoffeeCard;