import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import FormContainer from '../components/Form/FormContainer';
import Input from '../components/Form/Input';
import Btn from '../components/UI/Btn';
import CheckoutSteps from '../components/UI/CheckoutSteps';

import { saveShippingAddress } from '../actions/cart-actions';
import { useTitle } from '../hooks/title-hook';

function ShippingPage() {
  useTitle('MERN Shop | Shipping');
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  const inputs = [
    {
      controlId: 'address',
      label: 'Address',
      type: 'text',
      name: 'address',
      placeholder: 'Your Address',
      value: address,
      required: true,
      onChange: (e) => setAddress(e.target.value),
    },
    {
      controlId: 'city',
      label: 'City',
      type: 'text',
      name: 'city',
      placeholder: 'Your City',
      value: city,
      required: true,
      onChange: (e) => setCity(e.target.value),
    },
    {
      controlId: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      name: 'postalCode',
      placeholder: 'Your Postal Code',
      value: postalCode,
      required: true,
      onChange: (e) => setPostalCode(e.target.value),
    },
    {
      controlId: 'country',
      label: 'Country',
      type: 'text',
      name: 'country',
      placeholder: 'Your Country',
      value: country,
      required: true,
      onChange: (e) => setCountry(e.target.value),
    },
  ];

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          {inputs.map((input, index) => (
            <Input key={index} input={input} />
          ))}

          <Btn submit>Continue</Btn>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingPage;
