import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

import Message from '../UI/Message';
import Btn from '../UI/Btn';

import { createOrder } from '../../actions/order-actions';
import { GET_USER_INFO_RESET } from '../../constants/user-constants';
import { CREATE_ORDER_RESET } from '../../constants/order-constants';

import { addDecimals } from '../../utils';

function PlaceOrderSummary({ cart }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { order, success, error } = useSelector((state) => state.createOrder);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: GET_USER_INFO_RESET });
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [dispatch, order, history, success]);

  const placeOrderHandler = () => {
    if (cart.paymentMethod === 'COD') {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        })
      );
    }
    if (cart.paymentMethod === 'PayPal') {
      history.push(`/paypal`);
    }
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
            <Col>${addDecimals(cart.itemsPrice)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${addDecimals(cart.shippingPrice)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item className='bg-dark text-light'>
          <Row>
            <Col>Total</Col>
            <Col>${addDecimals(cart.totalPrice)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>{error && <Message text={error} />}</ListGroup.Item>
        <ListGroup.Item>
          <Btn block disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
            {cart.paymentMethod === 'COD' ? 'Order Now' : 'Continue to Pay'}
          </Btn>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default PlaceOrderSummary;
