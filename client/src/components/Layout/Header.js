import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl } from 'react-bootstrap';

import Icon from '../UI/Icon';
import Btn from '../UI/Btn';

import { logout } from '../../actions/user-actions';

function Header() {
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.loginUser);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                alt=''
                src='./images/logo.png'
                width='50'
                height='50'
                className='d-inline-block'
              />{' '}
              MERN Shop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Form onSubmit={submitHandler} inline className='ml-auto my-3 justify-content-center'>
              <FormControl
                type='text'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search'
                className='mr-sm-2'
              />
              <Btn outlineLight submit>
                Search
              </Btn>
            </Form>
            <Nav activeKey='/' className='ml-auto text-center'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <Icon cart /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <Icon user /> Log In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className='bg-dark'>
                  <LinkContainer to='/admin/allusers'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/allproducts'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/allorders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
