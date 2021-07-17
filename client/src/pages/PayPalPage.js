import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import Loader from '../components/UI/Loader';

import { createOrder, getOrderInfo, payOrder } from '../actions/order-actions';
import { PAY_ORDER_RESET, CREATE_ORDER_RESET } from '../constants/order-constants';

import { addDecimals } from '../utils';
import { useTitle } from '../hooks/title-hook';

function PayPalPage() {
  useTitle('MERN Shop | PayPal');
  const [sdk, setSdk] = useState(false);

  const { order } = useSelector((state) => state.createOrder);
  const { loading: loadingPay } = useSelector((state) => state.payOrder);
  const { success: successPay } = useSelector((state) => state.payOrder);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal', {
        cancelToken: source.token,
      });
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };

    if (order || successPay) {
      dispatch({ type: PAY_ORDER_RESET });
      dispatch(getOrderInfo(order._id));
    }

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdk(true);
    }

    return () => {
      source.cancel('axios request cancelled');
    };
  }, [dispatch, successPay, order]);

  const placeOrderHandler = () => {
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
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
    dispatch({ type: CREATE_ORDER_RESET });
    history.push(`/order/${order._id}`);
  };

  return (
    <>
      <h1 className='text-center'>Pay with:</h1>
      <div style={{ margin: '10% auto 0', maxWidth: '400px' }}>
        {loadingPay && <Loader />}
        {!sdk ? (
          <Loader />
        ) : (
          <PayPalButton
            onClick={placeOrderHandler}
            amount={addDecimals(cart.totalPrice)}
            onSuccess={successPaymentHandler}
          />
        )}
      </div>
    </>
  );
}

export default PayPalPage;
