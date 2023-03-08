import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { BookRideActions } from '../../rtk/features/BookRide';

const DriverSmallCard = ({ data , text }) => {
  const bookRide = useSelector(state => state.BookRide);
  const dispatch = useDispatch()
  const handleClick = e => {
    dispatch(BookRideActions.setSelectedDriver(data))
    dispatch(BookRideActions.goForward())
    dispatch(BookRideActions.setDriversVisible(false))
  }
  return (
    <div className='driver-small-card-container'>
      <div>
        <img src={data.profilePic} alt={data.userName} />
        <div>
          <p>{data.lastName + ' ' + data.firstName}</p>
          <p>$100</p>
        </div>
      </div>
      <div>
        <p>
          <MdLocationOn color="#02A238" size={20} />
          {bookRide.route?.start}
        </p>
        <p>
          <MdLocationOn color="#ED1A43" size={20} />
          {bookRide.route?.end}
        </p>
      </div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default DriverSmallCard;
