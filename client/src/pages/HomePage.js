import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import Products from '../components/Product/Products';
import Paginate from '../components/UI/Paginate';
import ProductCarousel from '../components/UI/ProductCarousel';
import Btn from '../components/UI/Btn';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/product-actions';
import { useTitle } from '../hooks/title-hook';

function HomePage() {
  useTitle('MERN Shop');
  const history = useHistory();
  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  const pageNumber = useParams().pageNumber || 1;

  const {
    loading,
    error,
    products: { products, page, pages },
  } = useSelector((state) => state.getAllProducts);

  useEffect(() => {
    dispatch(getAllProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Btn outlinePrimary margin onClick={() => history.goBack()}>
          Back
        </Btn>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <>
          <Products products={products} />
          <Paginate products pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
}

export default HomePage;
