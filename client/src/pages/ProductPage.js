import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Form } from 'react-bootstrap';

import Rating from '../components/UI/Rating';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import Btn from '../components/UI/Btn';

import { useDispatch, useSelector } from 'react-redux';
import { getProductInfo, createProductReview } from '../actions/product-actions';
import { CREATE_PRODUCT_REVIEW_RESET } from '../constants/product-constants';

import { addDecimals, localeDateString } from '../utils';
import { useTitle } from '../hooks/title-hook';

function ProductPage() {
  useTitle('MERN Shop | Product');
  const [quantity, setQuantity] = useState(1);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(1);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { loading, error, product } = useSelector((state) => state.getProductInfo);

  let { name, image, rating, totalReviews, price, description, inStock } = product;

  const { userInfo } = useSelector((state) => state.loginUser);

  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = useSelector((state) => state.createProductReview);

  price = addDecimals(price);

  useEffect(() => {
    dispatch(getProductInfo(id));
    if (successProductReview) {
      setNewRating(1);
      setComment('');
    }
    if (!product._id || product._id !== id) {
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
  }, [dispatch, id, product._id, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?quantity=${quantity}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        newRating,
        comment,
      })
    );
  };

  return (
    <>
      <Btn outlinePrimary margin onClick={() => history.goBack()}>
        Back
      </Btn>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${price}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={rating} text={`${totalReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p className='mt-2'>{description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col style={{ fontWeight: 'bold' }}>${price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {inStock > 0 ? (
                          <span className='badge badge-success p-2 '>In Stock</span>
                        ) : (
                          <span className='badge badge-danger p-2'>Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {inStock > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity:</Col>
                          <Col>
                            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                              {[...Array(inStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Btn block onClick={addToCartHandler}>
                          Add to Cart
                        </Btn>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message variant='info' text='No reviews.' />}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{localeDateString(review.createdAt)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {!showWriteReview ? (
                <Btn onClick={() => setShowWriteReview(true)}>Write Review</Btn>
              ) : (
                <Row>
                  <Col>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (
                      <Message variant='success' text='Review submitted successfully.' />
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && <Message text={errorProductReview} />}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label className='mr-1'>Rating</Form.Label>
                          <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </select>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Btn submit disabled={loadingProductReview}>
                          Post Review
                        </Btn>
                      </Form>
                    ) : (
                      <>
                        <Message variant='info' text='Please log in to write review.' />
                        <Link to='/login' className='btn btn-primary'>
                          Log In
                        </Link>
                      </>
                    )}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage;
