import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/Form/FormContainer';
import CheckoutSteps from '../components/UI/CheckoutSteps';
import Btn from '../components/UI/Btn';

import { savePaymentMethod } from '../actions/cart-actions';
import { useTitle } from '../hooks/title-hook';

function PaymentPage() {
  useTitle('MERN Shop | Payment');
  const history = useHistory();
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer className='text-center'>
        <h1>Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Cash on Delivery'
              id='COD'
              name='paymentMethod'
              value='COD'
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>

          <Btn submit>Continue</Btn>
        </Form>
      </FormContainer>
    </>
  );
}

export default PaymentPage;
