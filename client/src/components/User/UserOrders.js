import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import Loader from '../UI/Loader';
import Message from '../UI/Message';
import Icon from '../UI/Icon';
import Btn from '../UI/Btn';
import Paginate from '../UI/Paginate';

import { getUserOrders } from '../../actions/order-actions';

import { addDecimals, localeDateString } from '../../utils';

function UserOrders() {
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  let path = useLocation().pathname.split('/')[2];

  if (!path) path = 1;

  const {
    loading,
    error,
    orders: { orders, page, pages },
  } = useSelector((state) => state.getUserOrders);

  useEffect(() => {
    dispatch(getUserOrders(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <>
      <h2>My Orders</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : orders && orders.length > 0 ? (
        <>
          <Table striped bordered hover responsive className='table-sm text-center'>
            <thead>
              <tr>
                <th>NUM</th>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{(path - 1) * 10 + (index + 1)}</td>
                  <td>{order._id}</td>
                  <td>{localeDateString(order.createdAt)}</td>
                  <td>${addDecimals(order.totalPrice)}</td>
                  <td>{order.isPaid ? localeDateString(order.paidAt) : <Icon times />}</td>
                  <td>
                    {order.isDelivered ? localeDateString(order.deliveredAt) : <Icon times />}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Btn small>Details</Btn>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate orders page={page} pages={pages} />
        </>
      ) : (
        <Message text='No orders.' />
      )}
    </>
  );
}

export default UserOrders;
