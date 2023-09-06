import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { MyGlobalPageContext } from './PageContext';

export type UserRegistration = {
    email: string;
    password: string;
}

const RegistrationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const { setCurrentPage } = useContext(MyGlobalPageContext);


    const onSubmitForm: SubmitHandler<UserRegistration> = async data => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'test-token',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 201) {
                setMessage('User registered successfully');
                setCurrentPage('login')
            } else if (response.status === 400) {
                setMessage('User already exists');
            } else {
                setMessage('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div>
<button onClick={() => setCurrentPage('home')}>Back to the home screen</button>
            <h1>Registration Page</h1>
            <form onSubmit={handleSubmit(onSubmitForm as SubmitHandler<FieldValues>)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>Email is required and must be valid</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                />
                {errors.password && <p>Password is required</p>}

                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default RegistrationPage;
