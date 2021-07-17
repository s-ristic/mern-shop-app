import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import Rating from '../UI/Rating';

import { addDecimals } from '../../utils';

function Product({ product }) {
  return (
    <Card className='my-3 p-4 text-center'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h2'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.totalReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h2' className='mt-3'>
          ${addDecimals(product.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
