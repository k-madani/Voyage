import './Login.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState }  from 'react';
import { ToastContainer, toast } from 'react-toastify';

import axios  from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'; // Adjust the path as needed
import {setUser, clearUser} from "../../redux/reducers/userReducer";
import { decodeToken } from "react-jwt";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
      })

      const handleSubmit = async (e: React.FormEvent)  => {
        e.preventDefault();
        console.log(formData);
        try {
           const response =  await axios.post('http://localhost:4000/login', formData);
            try {
                const decodedToken: any | null = decodeToken(response.data.token);
                console.log(response.data.token);
                dispatch(setUser({ id: decodedToken.id, token: response.data.token, type: decodedToken.type }));
              } catch (error) {
                console.error('Error decoding token:', error);
              }
            toast.success('Logged in successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
              });
              navigate('/home');
          } catch (error) {
            toast.error('Login failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
              });
          }
        };

        const handleforgotPassword = () => {
            navigate('/forgotPassword');
          }
    return (
        
        <div className='login_container'>
            <div className='background-image2'></div>
            <div className='background-image-login'></div>
            <div className='login-page'>
            <div className='text-login'>SIGN</div>
            <div className='textlogin'>IN</div>
            </div>
            <form className='container-login' onSubmit={handleSubmit}>
                <div className='inputs-login'>
                    <div className='input-login'>E-MAIL
                        <input name="email" type="email" placeholder='Your e-mail goes here' 
                        onChange={(event) => setFormData({...formData, email: event.target.value})}/>
                    </div>
                    <div className='input-login password'>PASSWORD
                        <input name="password" type="password" placeholder='Your password goes here'
                        onChange={(event) => setFormData({...formData, currentPassword: event.target.value})} />
                    </div>
                    <div className='forgot-password' onClick={()=>handleforgotPassword()}>forgot password?</div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
                <div className="submit-container-login">
                <button type="submit" className="submit-login">SIGN IN</button>
                </div>
            </form> 
        </div>
    )
}

export default Login

