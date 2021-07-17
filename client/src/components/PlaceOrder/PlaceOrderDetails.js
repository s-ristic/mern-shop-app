import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';

import Message from '../UI/Message';

import { addDecimals } from '../../utils';

function PlaceOrderDetails({ cart }) {
  return (
    <>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Payment Method</h2>
          <strong>Method: </strong>
          {cart.paymentMethod}
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <Message text='Your cart is empty.' />
          ) : (
            <ListGroup variant='flush'>
              {cart.cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className='align-items-center'>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.quantity} x ${addDecimals(item.price)} = $
                      {addDecimals(item.quantity * item.price)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default PlaceOrderDetails;
