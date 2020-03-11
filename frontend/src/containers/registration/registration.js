import React, { useState } from 'react';
import FormInput from '../../shared/elements/form-input/form-input.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { regiserUser } from '../../reducers/user/user.actions';




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

        regiserUser(userCredentials);
    };

    const handleChange = event => {
      const { name, value } = event.target;
  
      setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='size-holder middle'>
            <h3 className='centered'>
                Fill out the form below to register your Scheduling 
                and Direction account!
            </h3>
            <br />
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
                    <CustomButton
                        buttonStyle="blue round"
                        type="submit"
                        label="submit"
                        />
                </div>
            </form>
        </div>
    )
}

export default Registration;