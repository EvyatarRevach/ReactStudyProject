import React from 'react';
import { useForm, Controller } from 'react-hook-form';

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

function AddTripForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Trip>(); // הגדר את סוג הנתונים ל- useForm

  const onSubmit = async (data: Trip) => {
    try {
      const authToken = 'test-token';

      const response = await fetch('http://localhost:3000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.error('Failed to add trip. Server error:', errorMessage);
        return;
      }

      alert('Trip added successfully');
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input type="text" {...register('name', { required: true })} />
      {errors.name && <p>Name is required</p>}

      <label>Destination</label>
      <input type="text" {...register('destination', { required: true })} />
      {errors.destination && <p>Destination is required</p>}

      <label>Start Date</label>
      <input type="date" {...register('startDate', { required: true })} />
      {errors.startDate && <p>Start Date is required</p>}

      <label>End Date</label>
      <input type="date" {...register('endDate', { required: true })} />
      {errors.endDate && <p>End Date is required</p>}

      <label>Description</label>
      <textarea {...register('description', { required: true })} />
      {errors.description && <p>Description is required</p>}

      <label>Price</label>
      <input type="number" {...register('price', { required: true })} />
      {errors.price && <p>Price is required</p>}

      <label>Image</label>
      <input type="text" {...register('image', { required: true })} />
      {errors.image && <p>Image is required</p>}

      <label>Activities</label>
      <Controller
        name="activities"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <input type="text" {...field} />
        )}
      />

      <button type="submit">Add Trip</button>
    </form>
  );
}

export default AddTripForm;
