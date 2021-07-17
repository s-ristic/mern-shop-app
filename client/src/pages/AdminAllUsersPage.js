import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AdminAll from '../components/Admin/AdminAll';

import { getAllUsers, deleteUser } from '../actions/user-actions';
import { useTitle } from '../hooks/title-hook';

function AdminAllUsersPage() {
  useTitle('Admin | All Users');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { pageNumber } = useParams();

  const {
    loading,
    error,
    users: { users, page, pages },
  } = useSelector((state) => state.getAllUsers);

  const { success: successDelete } = useSelector((state) => state.deleteUser);

  useEffect(() => {
    dispatch(getAllUsers(pageNumber));
  }, [dispatch, successDelete, pageNumber]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const showModalHandler = () => setShowModal((prevState) => !prevState);

  const tableHead = ['NUM', 'ID', 'NAME', 'EMAIL', 'ADMIN', null];

  return (
    <AdminAll
      heading='All Users'
      tableHead={tableHead}
      loading={loading}
      error={error}
      users={users}
      showModal={showModal}
      onClickModalHandler={showModalHandler}
      onClickDelete={deleteUserHandler}
      page={page}
      pages={pages}
    />
  );
}

export default AdminAllUsersPage;
