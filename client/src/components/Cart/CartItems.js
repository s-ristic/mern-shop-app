import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';

import Icon from '../UI/Icon';
import Btn from '../UI/Btn';

import { addToCart, removeFromCart } from '../../actions/cart-actions';

import { addDecimals } from '../../utils';

function CartItems({ cartItems }) {
  const dispatch = useDispatch();

  const addToCartHandler = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <ListGroup variant='flush'>
      {cartItems.map((item) => (
        <ListGroup.Item key={item._id}>
          <Row className='align-items-center'>
            <Col md={2} className='my-2'>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col className='my-2'>
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col md={6} className='my-2'>
              ${addDecimals(item.price)} x{' '}
              <select
                value={item.quantity}
                onChange={(e) => addToCartHandler(item._id, Number(e.target.value))}>
                {[...Array(item.inStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>{' '}
              = ${addDecimals(item.price * item.quantity)}
            </Col>
            <Col md={1} className='my-2'>
              <Btn danger small onClick={() => removeFromCartHandler(item._id)}>
                <Icon trash />
              </Btn>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CartItems;
