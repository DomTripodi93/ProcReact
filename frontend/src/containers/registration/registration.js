import React, { useState } from 'react';

const Registration = () => {
    const [userCredentials, setUserCredentials] = useState({
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    });
  
    const { email, name, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        console.log(email + ": " + name + " passwords match");
    };

    const handleChange = event => {
      const { name, value } = event.target;
  
      setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="border">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    type='email' 
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required/>
                <label>Name</label>
                <input 
                    type='name' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required/>
                <label>Password</label>
                <input 
                    type='password' 
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required/>
                <label>Confirm Password</label>
                <input 
                    type='password' 
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    required/>
                <button 
                    type="submit"
                    >Submit</button>
            </form>
        </div>
    )
}

export default Registration;