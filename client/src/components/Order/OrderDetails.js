import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';

import Message from '../UI/Message';

import { addDecimals, localeDateTimeString } from '../../utils';

function OrderDetails({ order }) {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h2>Shipping</h2>
        <p>
          <strong>Name: </strong> {order.user.name}
        </p>
        <p>
          <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
        </p>
        <p>
          <strong>Address: </strong>
          {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
        {order.isDelivered ? (
          <Message
            variant='success'
            text={`Delivered on ${localeDateTimeString(order.deliveredAt)}.`}
          />
        ) : (
          <Message text='Not Delivered.' />
        )}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Payment Method</h2>
        <p>
          <strong>Method: </strong>
          {order.paymentMethod}
        </p>
        {order.isPaid ? (
          <Message
            variant='success'
            text={`Paid on ${new Date(order.paidAt).toLocaleString().slice(0, -3)}.`}
          />
        ) : (
          <Message text='Not Paid.' />
        )}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Order Items</h2>
        {order.orderItems.length === 0 ? (
          <Message text='Order is empty.' />
        ) : (
          <ListGroup variant='flush'>
            {order.orderItems.map((item, index) => (
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
  );
}

export default OrderDetails;
