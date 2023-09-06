import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState, useContext } from 'react';
import { MyGlobalPageContext } from './PageContext';

interface LoginResponse {
    message: string;
    responseObj: {
        user: {
            id: string;
            email: string;
            password: string;
        };
        token: string;
    };
}

type UserRegistration = {
    email: string;
    password: string;
};

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserRegistration>();
    const [message, setMessage] = useState<string>('');
    const { setCurrentPage } = useContext(MyGlobalPageContext);

    const loginUser = async (data: UserRegistration) => {
        setCurrentPage('Loading')
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: LoginResponse = await response.json();

            if (response.ok) {
                if (result.responseObj.token) {
                
                    setTimeout(() => {
                        setCurrentPage('login'); 
                      }, 2000);
                    localStorage.setItem('authToken', result.responseObj.token);
                    setMessage('Login successful');
                } else {
                    console.error('Login failed');
                    setMessage('Login failed');
                }
            } else {
                console.error('Server error');
                setMessage('Server errorThe user does not exist');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Login failed');
        }
    };

    const onSubmit: SubmitHandler<UserRegistration> = (data) => {
        loginUser(data);
    };

    return (
        <div >
            <button onClick={() => setCurrentPage('home')}>Back to the home screen</button>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && <p>Email is required and must be valid</p>}

                <label>Password</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.password && <p>Password is required</p>}

                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default LoginPage;
