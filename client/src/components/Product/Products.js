import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from './Product';

function Products({ products }) {
  return (
    <>
      <h1 className='text-center'>All Products</h1>
      <Row>
        {products &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Products;
