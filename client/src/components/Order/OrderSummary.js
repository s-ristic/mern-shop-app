import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

import Loader from '../UI/Loader';
import Message from '../UI/Message';
import Btn from '../UI/Btn';

import { deliverOrder } from '../../actions/order-actions';
import { addDecimals } from '../../utils';

function OrderSummary({ order }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.loginUser);

  const { loading } = useSelector((state) => state.deliverOrder);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Price</Col>
            <Col>${addDecimals(order.itemsPrice)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${addDecimals(order.shippingPrice)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item className='bg-dark text-light'>
          <Row>
            <Col>Total</Col>
            <Col>${addDecimals(order.totalPrice)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Message variant='success' text='Order Received.' />
        </ListGroup.Item>

        {loading && <Loader />}

        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <ListGroup.Item>
            <Btn block onClick={deliverHandler}>
              Mark As Delivered
            </Btn>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default OrderSummary;
