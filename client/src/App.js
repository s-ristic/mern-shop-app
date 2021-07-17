import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Loader from './components/UI/Loader';
import PrivateRoute from './hoc/PrivateRoute';
import AdminRoute from './hoc/AdminRoute';

const Home = React.lazy(() => import('./pages/HomePage'));
const Product = React.lazy(() => import('./pages/ProductPage'));
const Cart = React.lazy(() => import('./pages/CartPage'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const Register = React.lazy(() => import('./pages/RegisterPage'));
const Profile = React.lazy(() => import('./pages/ProfilePage'));
const Shipping = React.lazy(() => import('./pages/ShippingPage'));
const Payment = React.lazy(() => import('./pages/PaymentPage'));
const PlaceOrder = React.lazy(() => import('./pages/PlaceOrderPage'));
const Order = React.lazy(() => import('./pages/OrderPage'));
const PayPal = React.lazy(() => import('./pages/PayPalPage'));
const AdminAllOrders = React.lazy(() => import('./pages/AdminAllOrdersPage'));
const AdminAllUsers = React.lazy(() => import('./pages/AdminAllUsersPage'));
const AdminAllProducts = React.lazy(() => import('./pages/AdminAllProductsPage'));
const AdminEditUser = React.lazy(() => import('./pages/AdminEditUserPage'));
const AdminEditProduct = React.lazy(() => import('./pages/AdminEditProductPage'));

function App() {
  return (
    <Router>
      <Header />
      <main className='py-5' style={{ minHeight: '100vh' }}>
        <Container>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path='/product/:id' component={Product} />
              <Route path='/cart/:id?' component={Cart} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute path='/profile/:pageNumber' component={Profile} />
              <PrivateRoute path='/profile' component={Profile} />
              <PrivateRoute path='/shipping' component={Shipping} />
              <PrivateRoute path='/payment' component={Payment} />
              <PrivateRoute path='/placeorder' component={PlaceOrder} />
              <PrivateRoute path='/order/:id' component={Order} />
              <PrivateRoute path='/paypal' component={PayPal} />
              <AdminRoute path='/admin/allorders/:pageNumber' component={AdminAllOrders} />
              <AdminRoute path='/admin/allorders' component={AdminAllOrders} />
              <AdminRoute path='/admin/allusers/:pageNumber' component={AdminAllUsers} />
              <AdminRoute path='/admin/allusers' component={AdminAllUsers} />
              <AdminRoute path='/admin/allproducts/:pageNumber' component={AdminAllProducts} />
              <AdminRoute path='/admin/allproducts' component={AdminAllProducts} />
              <AdminRoute path='/admin/user/:id/edit' component={AdminEditUser} />
              <AdminRoute path='/admin/product/:id/edit' component={AdminEditProduct} />
              <Route path='/search/:keyword/:pageNumber' component={Home} />
              <Route path='/search/:keyword' component={Home} />
              <Route path='/:pageNumber' component={Home} />
              <Route path='/' component={Home} />
            </Switch>
            <Redirect to='/' />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
