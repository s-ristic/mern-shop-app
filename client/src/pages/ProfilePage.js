import React from 'react';

import { Row, Col } from 'react-bootstrap';

import UpdateProfile from '../components/User/UpdateProfile';
import UserOrders from '../components/User/UserOrders';
import { useTitle } from '../hooks/title-hook';

function ProfilePage() {
  useTitle('MERN Shop | Profile');

  return (
    <Row>
      <Col md={3}>
        <UpdateProfile />
      </Col>

      <Col md={9}>
        <UserOrders />
      </Col>
    </Row>
  );
}

export default ProfilePage;
