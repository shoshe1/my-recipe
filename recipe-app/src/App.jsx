import Header from './components/Header';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import ApiPage from './pages/ApiPage';
import FavoritesPage from './pages/FavoritesPage';
import useLocalStorage from './hooks/useLocalStorage';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route } from 'react-router-dom';


import './App.css';

function App() {

    const [theme ,setTheme] = useLocalStorage('app-theme' , 'light');

    const toggleTheme = ( )=> {
        setTheme (theme === 'light' ? 'dark' :'light' );

    };
    return (
       <div className={`app theme-${theme}`}>
        <Header  theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/form' element={<FormPage />} />
                <Route path='/api' element={<ApiPage />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </main>
       </div>
    );
}

export default App;