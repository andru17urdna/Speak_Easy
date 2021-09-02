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
  const [email, setEmail] = useState('');
  const [availableEmail, setAvailableEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e, error= false) => {
    e.preventDefault();
      if (password === repeatPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
      } else {
        setErrors(["Passwords do not match."])
      }
  };



  const checkUsername = async (e) => {
    const data = await dispatch(usernameCheck(e))
      if (data.message) {
        setAvailableUsername(data.message)
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
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value.includes('@')
    || e.target.value.includes('.')) {
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
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      {availableUsername && (
        <>
          <p>{availableUsername}</p>
        </>
      )}
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
        {availableEmail && (
          <>
          <p>{availableEmail}</p>
          </>
        )}
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
