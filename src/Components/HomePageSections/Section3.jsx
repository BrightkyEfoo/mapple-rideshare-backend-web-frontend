import React from 'react';
import { ellipsis } from '../../helpers';

const Section3 = ({ data }) => {
  return (
    <div className='homepage-section3-container'>
      <p>{data.title}</p>
      <p>{ellipsis(120, data.main)}</p>
      <div>
        {data.cards.map((el, i) => {
          return <p key={i}>{el}</p>;
        })}
      </div>
    </div>
  );
};

export default Section3;
