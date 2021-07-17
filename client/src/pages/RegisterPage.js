import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';

import FormContainer from '../components/Form/FormContainer';
import Input from '../components/Form/Input';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import Btn from '../components/UI/Btn';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/user-actions';
import { REGISTER_USER_RESET } from '../constants/user-constants';
import { useTitle } from '../hooks/title-hook';

function RegisterPage() {
  useTitle('MERN Shop | Register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const history = useHistory();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.registerUser);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }

    return () => {
      dispatch({ type: REGISTER_USER_RESET });
    };
  }, [userInfo, history, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
    } else {
      dispatch(register(name, email, password));
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
    <FormContainer>
      <h1>Register</h1>

      {error && <Message text={error} />}
      {loading && <Loader />}

      {message && <Message text={message} />}

      <Form>
        {inputs.map((input, index) => (
          <Input key={index} input={input} />
        ))}

        <Btn submit onClick={submitHandler}>
          Register
        </Btn>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In.</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterPage;
