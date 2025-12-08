import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import ApiPage from './pages/ApiPage';

import './App.css';




function App() {
    const [currentPage , setCurrentPage]= useState('home');


    const renderPage= () => {
        switch (currentPage) {
            case  'home':
                return <HomePage/>;
            case 'form':
                return <FormPage/>;
            case 'api':
                return<ApiPage/>;
            default:
                return <HomePage/>;
            
        
        }
    };
    
    return (
        <div className="app">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="main-content">
                {renderPage()}
            </main>
            </div>
    );
}
export default App;