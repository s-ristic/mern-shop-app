import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

import Btn from '../UI/Btn';

import { addDecimals } from '../../utils';

function CartCheckout({ cartItems }) {
  const history = useHistory();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item className='text-center'>
          <div>Total items</div>
          <div>{totalItems}</div>
        </ListGroup.Item>
        <ListGroup.Item className='text-center'>
          <div>Total price</div>
          <div>
            <strong>${totalPrice}</strong>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <Btn block disabled={cartItems.length === 0} onClick={checkoutHandler}>
            Checkout
          </Btn>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default CartCheckout;
