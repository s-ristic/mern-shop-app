import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AdminEdit from '../components/Admin/AdminEdit';

import { getUserInfo, updateUser } from '../actions/user-actions';
import { UPDATE_USER_RESET } from '../constants/user-constants';
import { useTitle } from '../hooks/title-hook';

function AdminEditUserPage() {
  useTitle('Admin | Edit User');
  const history = useHistory();
  const userId = useParams().id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.getUserInfo);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.updateUser);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_USER_RESET });
      history.push('/admin/allusers');
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserInfo(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const setIsAdminHandler = (e) => setIsAdmin(e.target.checked);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  const inputs = [
    {
      controlId: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
      placeholder: 'Enter User Name',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      controlId: 'email',
      label: 'Email Address',
      type: 'email',
      name: 'email',
      placeholder: 'Enter User Email Address',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
  ];

  return (
    <AdminEdit
      editUser
      heading='Edit User'
      buttonLabel='Update User'
      inputs={inputs}
      value={isAdmin}
      onChange={setIsAdminHandler}
      submitHandler={submitHandler}
      loading={loading}
      error={error}
      loadingUpdate={loadingUpdate}
      errorUpdate={errorUpdate}
    />
  );
}

export default AdminEditUserPage;
