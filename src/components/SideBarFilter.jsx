// Renders location radio buttons used to filter coffees on ShopPage.
function SideBarFilter({ selectedLocation, onLocationChange }) {
  const locations = ["All", "Brooklyn", "Manhattan", "New York", "Queens"];

  return (
    <>
      {locations.map((location) => (
        <label key={location} className="location-option">
          <input
            type="radio"
            value={location}
            checked={selectedLocation === location}
            onChange={onLocationChange}
          />
          {location}
        </label>
      ))}
    </>
  );
}

export default SideBarFilter;