import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { userInfo: isLogin } = useSelector((state) => state.loginUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && isLogin.isAdmin ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default AdminRoute;
