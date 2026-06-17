// Renders the coffee search input used by ShopPage.
function SearchBar({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search coffees..."
      className="search-input"
      value={searchTerm}
      onChange={onSearch}
    />
  );
}

export default SearchBar;