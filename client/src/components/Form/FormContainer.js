import React from 'react';
import { Row, Col } from 'react-bootstrap';

function FormContainer({ className, children }) {
  return (
    <Row className={`justify-content-md-center ${className}`}>
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  );
}

export default FormContainer;
