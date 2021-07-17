import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import AdminEdit from '../components/Admin/AdminEdit';

import { getProductInfo, updateProduct } from '../actions/product-actions';
import { UPDATE_PRODUCT_RESET } from '../constants/product-constants';
import { useTitle } from '../hooks/title-hook';

function AdminEditProductPage() {
  useTitle('Admin | Edit Product');
  const history = useHistory();
  const productId = useParams().id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.getProductInfo);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.updateProduct);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      history.push('/admin/allproducts');
    } else {
      if (!product || product._id !== productId) {
        dispatch(getProductInfo(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setInStock(product.inStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const setImageHandler = (e) => setImage(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        inStock,
      })
    );
  };

  const inputs = [
    {
      controlId: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
      placeholder: 'Enter Name',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      controlId: 'price',
      label: 'Price',
      type: 'number',
      name: 'price',
      placeholder: 'Enter Price',
      value: price,
      onChange: (e) => setPrice(e.target.value),
    },
    {
      controlId: 'brand',
      label: 'Brand',
      type: 'text',
      name: 'brand',
      placeholder: 'Enter Brand',
      value: brand,
      onChange: (e) => setBrand(e.target.value),
    },
    {
      controlId: 'inStock',
      label: 'In Stock',
      type: 'number',
      name: 'inStock',
      placeholder: 'Enter Count In Stock',
      value: inStock,
      onChange: (e) => setInStock(e.target.value),
    },
    {
      controlId: 'category',
      label: 'Category',
      type: 'text',
      name: 'category',
      placeholder: 'Enter Category',
      value: category,
      onChange: (e) => setCategory(e.target.value),
    },
    {
      controlId: 'description',
      label: 'Description',
      type: 'text',
      name: 'description',
      placeholder: 'Enter Description',
      value: description,
      onChange: (e) => setDescription(e.target.value),
    },
  ];

  return (
    <AdminEdit
      editProduct
      heading='Edit Product'
      buttonLabel='Update Product'
      inputs={inputs}
      value={image}
      onChange={setImageHandler}
      submitHandler={submitHandler}
      uploadFileHandler={uploadFileHandler}
      loadingUpdate={loadingUpdate}
      errorUpdate={errorUpdate}
      loading={loading}
      error={error}
      uploading={uploading}
    />
  );
}

export default AdminEditProductPage;
