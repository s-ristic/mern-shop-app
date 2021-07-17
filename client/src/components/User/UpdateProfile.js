import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import Loader from '../UI/Loader';
import Message from '../UI/Message';
import Input from '../Form/Input';
import Btn from '../UI/Btn';

import { getUserInfo, updateUserInfo } from '../../actions/user-actions';
import { UPDATE_USER_INFO_RESET } from '../../constants/user-constants';

function UpdateProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.getUserInfo);
  let {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.updateUserInfo);

  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }

    return () => {
      setMessage('');
      setTimeout(() => {
        dispatch({ type: UPDATE_USER_INFO_RESET });
      }, 5000);
    };
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
    } else {
      dispatch(updateUserInfo({ id: user._id, name, email, password }));
    }
  };

  const inputs = [
    {
      controlId: 'name',
      label: 'Your Name',
      type: 'text',
      name: 'name',
      placeholder: 'Your Name',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      controlId: 'email',
      label: 'Your Email',
      type: 'email',
      name: 'email',
      placeholder: 'your-email@example.com',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      controlId: 'password',
      label: 'Your Password',
      type: 'password',
      name: 'password',
      placeholder: 'Minimal Length 6 Characters',
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      controlId: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  return (
    <>
      <h2>User Profile</h2>

      {error && <Message text={error} />}
      {loading && <Loader />}
      {message && <Message text={message} />}
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message text={errorUpdate} />}
      {successUpdate && <Message variant='success' text='Profile updated successfully.' />}

      <Form>
        {inputs.map((input, index) => (
          <Input key={index} input={input} />
        ))}

        <Btn submit onClick={submitHandler}>
          Update Profile
        </Btn>
      </Form>
    </>
  );
}

export default UpdateProfile;
