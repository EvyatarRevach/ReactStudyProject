import  './App.css'
import React, { useContext, useRef, useState } from 'react';
import { MyGlobalPageContext, pageContextType } from './components/PageContext';
import HomePage from './components/Home';
import AllToursPage from './components/AllToursPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import TripCard from './components/TripCard'
import AddTrip from './components/AddTripForm'
import UpdateTrip from './components/UpdateTripForm'
import Loading from './components/Loading';


function App() {
    const [currentPage, setCurrentPage] = useState<string>('home');
    const idRef = useRef("")

    return (
        <MyGlobalPageContext.Provider value={{ currentPage, setCurrentPage , idRef }}>
            <div>
                {currentPage === 'home' && <HomePage />}
                {currentPage === 'allTours' && <AllToursPage />}
                {currentPage === 'registration' && <RegistrationPage />}
                {currentPage === 'login' && <LoginPage />}
                {currentPage === 'tripDetails' && <TripCard />}
                {currentPage === 'AddTrip' && <AddTrip />}
                {currentPage === 'UpdateTrip' && <UpdateTrip />}
                {currentPage === 'Loading' && <Loading />}
            </div>
  
        </MyGlobalPageContext.Provider>
    );
}

export default App;
