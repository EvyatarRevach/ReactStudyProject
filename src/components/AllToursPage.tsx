import React, { useState, useEffect, useContext } from 'react';
// import AddTripForm from './AddTripForm'
import { MyGlobalPageContext } from './PageContext';

type Trip = {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
    description: string;
    price: number;
    activities: string[];
};

function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const { setCurrentPage, idRef } = useContext(MyGlobalPageContext);
    const authToken = localStorage.getItem('authToken');

    async function fetchTrips() {
        try {
            const response = await fetch('http://localhost:3000/api/trips');
            if (!response.ok) {
                throw new Error('Failed to fetch trips');
            }
            const data = await response.json();
            setTrips(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    function BackToTheHomeScreen() {
        setCurrentPage('home');
    }

    const handleClick = (id: string) => {
        idRef.current = id;
        setCurrentPage("tripDetails");
    }
    const handleUpdate = (id: string) => {
        idRef.current = id;
        setCurrentPage("UpdateTrip");
    }

    const handleDelete = async (id: string) => {
        if (!authToken) return
        try {
            const response = await fetch(`http://localhost:3000/api/trips/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: authToken,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete trip');
            }
            fetchTrips();
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    }

    return (
        <div className='trips-container'>
            <button onClick={() => setCurrentPage('AddTrip')}>Add Trip</button>
            <button onClick={BackToTheHomeScreen}>Back to the home screen</button>
            <h1>List of trips</h1>
            {trips.map((trip) => (
                <div key={trip.id}>
                    <button onClick={() => handleClick(trip.id)}>
                        <h2>{trip.name}</h2>
                        <p>Target: {trip.destination}</p>
                        <p>Start Date: {trip.startDate}</p>
                        <p>End date: {trip.endDate}</p>
                        <img src={trip.image} alt={trip.name} />
                    </button>
                    <button onClick={() => handleDelete(trip.id)}>Delete Trip</button>
                    <button onClick={() => handleUpdate(trip.id)}>Update Trip</button>

                </div>
    ))
}
        </div >
    );
}

export default TripsPage;
