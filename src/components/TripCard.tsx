import React, { useContext, useEffect } from 'react';
import { MyGlobalPageContext, pageContextType } from './PageContext';

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

function TripDetailsPage() {
    const { setCurrentPage, idRef } = useContext<pageContextType>(MyGlobalPageContext);
    const [trip, setTrip] = React.useState<Trip | null>(null);

    async function fetchTripDetails(id: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/trips/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch trip details');
            }
            const data = await response.json();
            setTrip(data);
            setCurrentPage('tripDetails');
        } catch (error) {
            console.error('Error fetching trip details:', error);
        }
    }

    useEffect(() => {
        if (idRef) {
            fetchTripDetails(idRef.current);
        }
    }, []);

    function BackToTrips() {
        setCurrentPage('allTours');
    }

    if (!trip) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <button onClick={BackToTrips}>Back to trips</button>
            <h1>{trip.name}</h1>
            <p>Destination: {trip.destination}</p>
            <p>Start Date: {trip.startDate}</p>
            <p>End Date: {trip.endDate}</p>
            <p>Description: {trip.description}</p>
            <p>Price: ${trip.price}</p>
            <img src={trip.image} alt={trip.name} />
            <h2>Activities</h2>
            <ul>
                {trip.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
            </ul>
        </div>
    );
}

export default TripDetailsPage;