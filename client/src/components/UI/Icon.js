import React from 'react';

function Icon({
  facebook,
  linkedin,
  github,
  envelope,
  trash,
  cart,
  user,
  times,
  plus,
  edit,
  check,
  star,
  starHalf,
  starO,
  comment,
}) {
  if (facebook) {
    return <i className='fab fa-facebook-f' />;
  }
  if (linkedin) {
    return <i className='fab fa-linkedin-in' />;
  }
  if (github) {
    return <i className='fab fa-github' />;
  }
  if (envelope) {
    return <i className='fas fa-envelope' />;
  }
  if (trash) {
    return <i className='fas fa-trash' />;
  }
  if (cart) {
    return <i className='fas fa-shopping-cart' />;
  }
  if (user) {
    return <i className='fas fa-user' />;
  }
  if (times) {
    return <i className='fas fa-times text-danger' />;
  }
  if (check) {
    return <i className='fas fa-check text-success' />;
  }
  if (plus) {
    return <i className='fas fa-plus' />;
  }
  if (edit) {
    return <i className='fas fa-edit' />;
  }
  if (star) {
    return <i className='fas fa-star' style={{ color: '#D5B038' }} />;
  }
  if (starHalf) {
    return <i className='fas fa-star-half-alt' style={{ color: '#D5B038' }} />;
  }
  if (starO) {
    return <i className='far fa-star' style={{ color: '#D5B038' }} />;
  }
  if (comment) {
    return <i className='far fa-comment-dots' />;
  }
}

export default Icon;
