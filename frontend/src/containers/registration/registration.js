import React, { useState } from 'react';
import FormInput from '../../shared/form-input/form-input.component';


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
                <FormInput
                    label='Email'
                    type='email' 
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                    />
                <FormInput
                    label='Name'
                    type='name' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required
                    />
                <FormInput
                    label='Password'
                    type='password' 
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                    />
                <FormInput
                    label='Confirm Password'
                    type='password' 
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    />
                <div className="input-width">
                    <button 
                        type="submit"
                        >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Registration;