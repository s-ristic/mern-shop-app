import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

import Loader from '../UI/Loader';
import Message from '../UI/Message';
import Icon from '../UI/Icon';
import Btn from '../UI/Btn';
import Paginate from '../UI/Paginate';

import { addDecimals, localeDateString } from '../../utils';
import ConfirmModal from '../Modal/ConfirmModal';

function AdminAll({
  heading,
  tableHead,
  loading,
  error,
  users,
  orders,
  products,
  showModal,
  onClickModalHandler,
  onClickDelete,
  onClickCreateProduct,
  loadingDelete,
  errorDelete,
  loadingCreate,
  errorCreate,
  pages,
  page,
}) {
  const [id, setId] = useState(null);

  let path = useLocation().pathname.split('/')[3];
  if (!path) path = 1;

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>{heading}</h1>
        </Col>
        {products && (
          <Col xs={12} md={6} className='text-right mb-4 mb-md-0'>
            <Btn onClick={onClickCreateProduct}>
              <Icon plus /> Create Product
            </Btn>
          </Col>
        )}
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message text={errorDelete} />}
      {loadingCreate && <Loader />}
      {errorCreate && <Message text={errorCreate} />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <>
          <ConfirmModal
            id={id}
            showModal={showModal}
            onClickModalHandler={onClickModalHandler}
            onClickDelete={onClickDelete}
          />

          <Table striped bordered hover responsive className='table-sm text-center'>
            <thead>
              <tr className='bg-dark text-light'>
                {tableHead.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{(path - 1) * 10 + (index + 1)}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.isAdmin ? <Icon check /> : <Icon times />}</td>
                    <td className='d-flex justify-content-center'>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <Btn small>
                          <Icon edit />
                        </Btn>
                      </Link>
                      <Btn
                        danger
                        small
                        onClick={() => {
                          setId(user._id);
                          onClickModalHandler();
                        }}>
                        <Icon trash />
                      </Btn>
                    </td>
                  </tr>
                ))}
              {orders &&
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{(path - 1) * 10 + (index + 1)}</td>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
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
              {products &&
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(path - 1) * 10 + (index + 1)}</td>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${addDecimals(product.price)}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className='d-flex justify-content-center'>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Btn small>
                          <Icon edit />
                        </Btn>
                      </Link>
                      <Btn
                        danger
                        small
                        onClick={() => {
                          setId(product._id);
                          onClickModalHandler();
                        }}>
                        <Icon trash />
                      </Btn>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {products && <Paginate products pages={pages} page={page} isAdmin={true} />}
          {orders && <Paginate orders pages={pages} page={page} isAdmin={true} />}
          {users && <Paginate users pages={pages} page={page} isAdmin={true} />}
        </>
      )}
    </>
  );
}

export default AdminAll;
