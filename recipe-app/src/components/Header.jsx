import './Header.css';

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-icon">🍳</span>
          <h1>Recipe Manager</h1>
        </div>
        
        <nav className="header-nav">
          <NavLink
          to="/"
          className={({isActive}) => `nav-button ${isActive ? 'active' : ''}`}>

            🏠 My Recipes
          </NavLink>
          
          
          <NavLink
          to="/form"
          className={({isActive}) => `nav-button ${isActive ? 'active' : ''}`}>
            ➕ Add Recipe
          </NavLink>
          <NavLink
          to="/api"
          className={({isActive}) => `nav-button ${isActive ? 'active' : ''}`}>
          
            🔍 Discover
          </NavLink>
          <NavLink
          to="/favorites"
          className={({isActive}) => `nav-button ${isActive ? 'active' : ''}`}>
            ❤️ Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;