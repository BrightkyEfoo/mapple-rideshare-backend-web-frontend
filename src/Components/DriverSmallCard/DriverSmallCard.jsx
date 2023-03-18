import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { BookRideActions } from '../../rtk/features/BookRide';
import { useMediaQuery } from 'react-responsive';
import { ellipsis } from '../../helpers';

const DriverSmallCard = ({ data, text, price }) => {
  const bookRide = useSelector(state => state.BookRide);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const dispatch = useDispatch();
  const handleClick = e => {
    dispatch(BookRideActions.setSelectedDriver(data));
    dispatch(BookRideActions.goForward());
    dispatch(BookRideActions.setDriversVisible(false));
  };
  return (
    <div className="driver-small-card-container">
      <div>
        <img src={data.profilePic} alt={data.userName} />
        <div>
          <p>{data.lastName + ' ' + data.firstName}</p>
          <p>${price}</p>
        </div>
      </div>
      <div>
        <div>
          <MdLocationOn color="#02A238" size={isMobile ? 15 : 20} />
          <p>{ellipsis(30, bookRide.route?.start)}</p>
        </div>
        <div>
          <MdLocationOn color="#ED1A43" size={isMobile ? 15 : 20} />
          <p>{ellipsis(30, bookRide.route?.end)}</p>
        </div>
      </div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default DriverSmallCard;
