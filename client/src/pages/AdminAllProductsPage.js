import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AdminAll from '../components/Admin/AdminAll';

import { getAllProducts, deleteProduct, createProduct } from '../actions/product-actions';
import { CREATE_PRODUCT_RESET } from '../constants/product-constants';
import { useTitle } from '../hooks/title-hook';

function AdminAllProductsPage() {
  useTitle('Admin | All Products');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();

  const {
    loading,
    error,
    products: { products, page, pages },
  } = useSelector((state) => state.getAllProducts);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.deleteProduct);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.createProduct);

  const { userInfo } = useSelector((state) => state.loginUser);

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getAllProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const showModalHandler = () => setShowModal((prevState) => !prevState);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const tableHead = ['NUM', 'ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND', null];

  return (
    <AdminAll
      heading='All Products'
      tableHead={tableHead}
      loading={loading}
      error={error}
      loadingCreate={loadingCreate}
      errorCreate={errorCreate}
      loadingDelete={loadingDelete}
      errorDelete={errorDelete}
      products={products}
      showModal={showModal}
      onClickModalHandler={showModalHandler}
      onClickDelete={deleteProductHandler}
      onClickCreateProduct={createProductHandler}
      page={page}
      pages={pages}
    />
  );
}

export default AdminAllProductsPage;
