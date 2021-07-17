import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';

import Message from './Message';

import { getTopProducts } from '../../actions/product-actions';

import { addDecimals } from '../../utils';

function ProductCarousel() {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.getTopProducts);

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return loading ? null : error ? (
    <Message text={error} />
  ) : (
    <Carousel pause='hover' className='bg-light'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className='bg-primary'>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-primary font-weight-bold'>{product.name}</h2>
              <h3 className='text-info font-weight-bold'>${addDecimals(product.price)}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
