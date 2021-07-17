import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import PlaceOrderDetails from '../components/PlaceOrder/PlaceOrderDetails';
import PlaceOrderSummary from '../components/PlaceOrder/PlaceOrderSummary';
import CheckoutSteps from '../components/UI/CheckoutSteps';
import { useTitle } from '../hooks/title-hook';

function PlaceOrderPage() {
  useTitle('MERN Shop | Place Order');
  const history = useHistory();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cart.shippingPrice = cart.paymentMethod === 'COD' ? 2.5 : 0;
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <PlaceOrderDetails cart={cart} />
        </Col>

        <Col md={4}>
          <PlaceOrderSummary cart={cart} />
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
