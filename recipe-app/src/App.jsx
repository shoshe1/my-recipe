import Header from './components/Header';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import ApiPage from './pages/ApiPage';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/favoritesContext';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <FavoritesProvider>
            <div className='app'>
                <Header />
                <main className='main-content'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/form' element={<FormPage />} />
                        <Route path='/api' element={<ApiPage />} />
                        <Route path='/favorites' element={<FavoritesPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </FavoritesProvider>
    );
}

export default App;