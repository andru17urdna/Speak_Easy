import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import {usernameCheck, emailCheck} from '../../store/session'
import "../css/signup.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [availableUsername, setAvailableUsername] =useState('');
  const [userNameColor, setUserNameColor] =useState({})
  const [emailColor, setEmailColor] =useState({})
  const [email, setEmail] = useState('');
  const [availableEmail, setAvailableEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [user_img, setUserImg] =useState('https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png');
  const [description, setDescription] =useState('User description has not been added yet.')

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e, error= false) => {
    e.preventDefault();
      setErrors([]);

      if (!email.includes('@') || !email.includes('.')) {
        setErrors(prevState => [...prevState, "Please enter a valid email."])
          error= true;
      }

      if (password !== repeatPassword) {
        setErrors(prevState => [...prevState, "Passwords do not match."])
        error= true;
      }

      if (!error) {
        const data = await dispatch(signUp(username, email, password, user_img, description));
        if (data) {
          setErrors(data)
        }
      }
  };


  const checkUsername = async (e) => {
    const data = await dispatch(usernameCheck(e))
      if (data.message) {
        console.log(data.message)
        setAvailableUsername(data.message)
          if(data.message === "User Name is already in use."){
            setUserNameColor({color:'red'})
          } else {
            setUserNameColor({color:'green'})
          }
      }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length > 3) {
      checkUsername(e.target.value)
    }
  };


  const checkEmail = async (e) => {
    const data = await dispatch(emailCheck(e))
    if (data.message) {
      setAvailableEmail(data.message)
      if(data.message === "Email is already in use."){
        setEmailColor({color:'red'})
      } else {
        setEmailColor({color:'green'})
      }
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value.includes('@')
    && e.target.value.includes('.')) {
      checkEmail(e.target.value)
    }
  };





  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id='sign-up_form' onSubmit={onSignUp}>
      <h1 id='sign-up_h1'>Sign Up</h1>
      <div>
        {errors.map((error, ind) => (
          <div className='signup_errors' key={ind}>{error}</div>
        ))}
      </div>
      <div className='input_container-div'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      {availableUsername && (
        <>
          <p style={userNameColor}>{availableUsername}</p>
        </>
      )}
      </div>
      <div className='input_container-div'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
        {availableEmail && (
          <>
          <p style={emailColor}>{availableEmail}</p>
          </>
        )}
      </div>
      <div className='input_container-div'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='input_container-div'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='input_container-div'>
        <label>Profile Image</label>
        <input
          type='text'
          name='user_image'
          onChange={(e) => setUserImg(e.target.value)}
        ></input>
      </div>
      <div className='input_container-div'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          onChange={(e) =>{setDescription(e.target.value)}}
        ></input>
      </div>
      <button id='sign-up_button' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
