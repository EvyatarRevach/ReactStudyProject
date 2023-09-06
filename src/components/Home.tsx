import { MyGlobalPageContext } from './PageContext';
import React, { useContext } from 'react';

function HomePage() {
    const { setCurrentPage } = useContext(MyGlobalPageContext);

    const handleAllToursClick = () => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            setCurrentPage('allTours');
        } else {
            alert('You must log in first to view all tours.');
            setCurrentPage('login');
        }
    };

    const handleRegistrationClick = () => {
        setCurrentPage('registration');
    };

    const handleLoginClick = () => {
        setCurrentPage('login');
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('authToken');
        // setCurrentPage('home');
        alert('Logout successful');
      };
    return (
        <div className='home'>
            <h1>Home page</h1>
            <button onClick={handleAllToursClick}>Showing all trips</button>
            <button onClick={handleRegistrationClick}>Registration</button>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleLogoutClick}>Logout</button>

        </div>
    );
}

export default HomePage;
