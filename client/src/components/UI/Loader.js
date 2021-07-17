import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='primary'
      style={{
        width: '50px',
        height: '50px',
        margin: 'auto',
        display: 'block',
      }}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
}

export default Loader;
