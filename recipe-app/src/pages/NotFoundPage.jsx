import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">🍽️</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The recipe you're looking for doesn't exist.
        </p>
        
        <div className="not-found-actions">
          <button 
            onClick={() => navigate('/')} 
            className="home-btn"
          >
            🏠 Go Home
          </button>
          <button 
            onClick={() => navigate(-1)} 
            className="back-btn"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;