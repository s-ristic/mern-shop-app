import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AdminAll from '../components/Admin/AdminAll';

import { getAllOrders } from '../actions/order-actions';
import { useTitle } from '../hooks/title-hook';

function AdminAllOrdersPage() {
  useTitle('Admin | All Orders');
  const dispatch = useDispatch();

  const { pageNumber } = useParams() || 1;

  const {
    loading,
    error,
    orders: { orders, page, pages },
  } = useSelector((state) => state.getAllOrders);

  useEffect(() => {
    dispatch(getAllOrders(pageNumber));
  }, [dispatch, pageNumber]);

  const tableHead = ['NUM', 'ID', 'USER', 'DATE', 'TOTAL', 'PAID', 'DELIVERED', null];

  return (
    <AdminAll
      heading='All Orders'
      tableHead={tableHead}
      loading={loading}
      error={error}
      orders={orders}
      page={page}
      pages={pages}
    />
  );
}

export default AdminAllOrdersPage;
