import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, adminComponent: AdminComponent, ...rest }) => {
  const { userInfo: isLogin } = useSelector((state) => state.loginUser);

  return (
    <Route
      {...rest}
      render={(props) => (isLogin ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};

export default PrivateRoute;
