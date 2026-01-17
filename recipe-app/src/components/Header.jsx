import './Header.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectFavoritesCount} from '../store/favoritesSlice';


function Header({ theme, toggleTheme }) {
  const favoritesCount = useSelector(selectFavoritesCount);
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
            {favoritesCount > 0 && <span className="favorites-badge">{favoritesCount}</span>}
          </NavLink>
          <button onClick={toggleTheme}
          className="theme-toggle-btn"
          title={`Switch to ${theme ==='light' ? 'dark' : 'light'}mode`}>
            {theme === 'light' ?   '🌙' : '☀️' }
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;