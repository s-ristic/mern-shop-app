import React from 'react';
import { Form } from 'react-bootstrap';

function Input({ input }) {
  const { controlId, label, type, name, placeholder, value, required, onChange } = input;
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}></Form.Control>
    </Form.Group>
  );
}

export default Input;
