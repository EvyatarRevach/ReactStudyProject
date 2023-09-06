import React, { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MyGlobalPageContext, pageContextType } from './PageContext';

type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  activities: string[];
  image: string; 
};

type UpdateTripData = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  activities: string[];
  image: FileList | null; 
};

function UpdateTripForm() {
  const { setCurrentPage, idRef } = useContext<pageContextType>(MyGlobalPageContext);
  const [trip, setTrip] = useState<Trip | null>(null);
  const authToken = localStorage.getItem('authToken');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UpdateTripData>();

  const fetchTripDetails = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/trips/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trip details');
      }
      const data = await response.json();
      setTrip(data);
      
      // Set the form fields with the trip details
      setValue('name', data.name);
      setValue('destination', data.destination);
      setValue('startDate', data.startDate);
      setValue('endDate', data.endDate);
      setValue('description', data.description);
      setValue('price', data.price);
      setValue('activities', data.activities.join(', '));
      setValue('image', data.image); 
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };

  useEffect(() => {
    if (idRef) {
      fetchTripDetails(idRef.current);
    }
  }, []);

  const onSubmit: SubmitHandler<UpdateTripData> = async (data) => {
    try {
      if (!authToken) {
        console.error('Not authenticated');
        return;
      }

      
      const tripUpdateResponse = await fetch(`http://localhost:3000/api/trips/${idRef.current}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        },
        body: JSON.stringify(data),
      });

      if (!tripUpdateResponse.ok) {
        const errorMessage = await tripUpdateResponse.json();
        console.error('Failed to update trip. Server error:', errorMessage);
        return;
      }

      alert('Trip updated successfully');
      setCurrentPage('allTours');
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setCurrentPage('allTours')}>Back to trips</button>
      <h1>Update Trip</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" {...register("name", { required: false })} />
        {errors.name && <p>Name is required</p>}

        <label>Destination</label>
        <input type="text" {...register("destination", { required: false })} />
        {errors.destination && <p>Destination is required</p>}

        <label>Start Date</label>
        <input type="text" {...register("startDate", { required: false })} />
        {errors.startDate && <p>Start Date is required</p>}

        <label>End Date</label>
        <input type="text" {...register("endDate", { required: false })} />
        {errors.endDate && <p>End Date is required</p>}

        <label>Description</label>
        <textarea {...register("description", { required: false })} />
        {errors.description && <p>Description is required</p>}

        <label>Price</label>
        <input type="number" {...register("price", { required: false })} />
        {errors.price && <p>Price is required</p>}

        <label>Activities</label>
        <input type="text" {...register("activities", { required: false })} />
        {errors.activities && <p>Activities are required</p>}

        <label>Image</label>
        <input type="text" {...register("image", { required: false })} />

        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
}

export default UpdateTripForm;
