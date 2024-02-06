import './Registration.css';

import React, { useState }  from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios  from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; 

interface userDetails {
  id: string,
  token: string
}

const Registration = () => { 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        currentPassword: '',
        previousPasswords: [],
        milePoints: 50,
        userType: 'voyager',
      })
      const user = useSelector((state: RootState) => state.user);

      const handleSubmit = async (e: React.FormEvent)  => {
        e.preventDefault();
        console.log(formData);
        try {
          var userToken = "";
          var userId = "";
          if(user != null){
            userId = (user as userDetails).id;
            userToken = (user as userDetails).token;
          }
            await axios.post('http://localhost:4000/register', formData);
            toast.success('Registration Successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
              });
              navigate('/login');
            //alert('Registration Successful!');
          } catch (error) {
            toast.error('Registration Failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
              });
            //alert('Registration Failed. Please try again.');
          }
        };

        const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

    return (
        <div className='register-container'>
            <div className='background-image1'></div>
            <div className='text'>SIGN</div>
            <div className='text-in'>UP</div>
            <div className='signin' onClick={handleLoginClick}>SIGN IN</div>
            <div className='background-image-reg'></div>
            <form className='container' onSubmit={handleSubmit}>
            <div className='inputs'>
                <div className='input'>FIRST NAME
                    <input name="fname" type="text" placeholder='Your first name goes here' 
                    onChange={(event) => setFormData({...formData, firstName: event.target.value})}/>
                </div>
                <div className='input'>LAST NAME
                    <input name="lname" type="text" placeholder='Your last name goes here' 
                    onChange={(event) => setFormData({...formData, lastName: event.target.value})}/>
                </div>
                <div className='input'>E-MAIL
                    <input name="email" type="email" placeholder='Your e-mail goes here' 
                    onChange={(event) => setFormData({...formData, email: event.target.value})}/>
                </div>
                <div className='input'>CONTACT
                    <input name="contact" type="text1" placeholder='Your contact goes here' 
                    onChange={(event) => setFormData({...formData, contact: event.target.value})}/>
                </div>
                <div className='input'>PASSWORD
                    <input name="password" type="password" placeholder='Your password goes here' 
                    onChange={(event) => setFormData({...formData, currentPassword: event.target.value})}/>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="submit-container">
                <button type="submit" className="submit">SIGN UP</button>
            </div>
            
            </form>
        </div>
    )
}

export default Registration

