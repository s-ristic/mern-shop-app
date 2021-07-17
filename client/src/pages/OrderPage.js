import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import OrderDetails from '../components/Order/OrderDetails';
import OrderSummary from '../components/Order/OrderSummary';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import Btn from '../components/UI/Btn';

import { getOrderInfo } from '../actions/order-actions';
import { PAY_ORDER_RESET, DELIVER_ORDER_RESET } from '../constants/order-constants';
import { useTitle } from '../hooks/title-hook';

function OrderPage() {
  useTitle('MERN Shop | Order');
  const history = useHistory();
  const orderId = useParams().id;

  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.getOrderInfo);
  const { success: successPay } = useSelector((state) => state.payOrder);
  const { success: successDeliver } = useSelector((state) => state.deliverOrder);

  useEffect(() => {
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: PAY_ORDER_RESET });
      dispatch({ type: DELIVER_ORDER_RESET });
      dispatch(getOrderInfo(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message text={error} />
  ) : (
    <>
      <Btn outlinePrimary margin onClick={() => history.goBack()}>
        Back
      </Btn>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <OrderDetails order={order} />
        </Col>
        <Col md={4}>
          <OrderSummary order={order} />
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
