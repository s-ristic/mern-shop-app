import React from 'react';

import Icon from './Icon';

function Rating({ value, text }) {
  return (
    <div>
      <span>{value >= 1 ? <Icon star /> : value >= 0.5 ? <Icon starHalf /> : <Icon starO />}</span>
      <span>{value >= 2 ? <Icon star /> : value >= 1.5 ? <Icon starHalf /> : <Icon starO />}</span>
      <span>{value >= 3 ? <Icon star /> : value >= 2.5 ? <Icon starHalf /> : <Icon starO />}</span>
      <span>{value >= 4 ? <Icon star /> : value >= 3.5 ? <Icon starHalf /> : <Icon starO />}</span>
      <span>{value >= 5 ? <Icon star /> : value >= 4.5 ? <Icon starHalf /> : <Icon starO />}</span>
      <p className='mt-2 mb-0'>
        {text} <Icon comment />
      </p>
    </div>
  );
}

export default Rating;
