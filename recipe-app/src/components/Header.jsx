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
          <button
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 My Recipes
          </button>
          <button
            className={`nav-button ${currentPage === 'form' ? 'active' : ''}`}
            onClick={() => setCurrentPage('form')}
          >
            ➕ Add Recipe
          </button>
          <button
            className={`nav-button ${currentPage === 'api' ? 'active' : ''}`}
            onClick={() => setCurrentPage('api')}
          >
            🔍 Discover
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;