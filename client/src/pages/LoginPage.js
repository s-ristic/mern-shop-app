import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';

import FormContainer from '../components/Form/FormContainer';
import Input from '../components/Form/Input';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import Btn from '../components/UI/Btn';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/user-actions';
import { useTitle } from '../hooks/title-hook';

function LoginPage() {
  useTitle('MERN Shop | Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const history = useHistory();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const inputs = [
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
  ];

  return (
    <FormContainer>
      <h1>Log In</h1>

      {error && <Message text={error} />}
      {loading && <Loader />}

      <Form>
        {inputs.map((input, index) => (
          <Input key={index} input={input} />
        ))}

        <Btn submit onClick={submitHandler}>
          Log In
        </Btn>
      </Form>

      <Row className='py-3'>
        <Col>
          Don't have an account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register.</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
