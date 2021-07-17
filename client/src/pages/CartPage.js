import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Message from '../components/UI/Message';
import CheckoutSteps from '../components/UI/CheckoutSteps';
import CartItems from '../components/Cart/CartItems';
import CartCheckout from '../components/Cart/CartCheckout';
import Btn from '../components/UI/Btn';

import { addToCart } from '../actions/cart-actions';
import { useTitle } from '../hooks/title-hook';

function CartPage() {
  useTitle('MERN Shop | Cart');
  const { id } = useParams();
  const location = useLocation();

  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  return (
    <>
      <CheckoutSteps step1 />

      <Row>
        <Col md={9}>
          {cartItems.length === 0 ? (
            <>
              <h1>Your Cart</h1>
              <Message text='Your cart is empty.' />
              <Link to='/' className='btn btn-primary'>
                Add to Cart
              </Link>
            </>
          ) : (
            <>
              <Btn outlinePrimary margin onClick={() => history.goBack()}>
                Back
              </Btn>
              <h1>Your Cart</h1>
              <CartItems cartItems={cartItems} />
            </>
          )}
        </Col>
        <Col md={3}>{cartItems.length > 0 && <CartCheckout cartItems={cartItems} />}</Col>
      </Row>
    </>
  );
}

export default CartPage;
