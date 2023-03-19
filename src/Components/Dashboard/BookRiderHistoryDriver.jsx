import React, { useEffect, useState } from 'react';
import { socket } from '../../Socket';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';
import { DriverBookingActions } from '../../rtk/features/DriverBooking';
import axios from 'axios';
import './driver-actual-booking.css';
import SmallMap from '../Map/SmallMap';

const BookRiderHistoryDriver = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  const dispatch = useDispatch();
  const DriverBooking = useSelector(state => state.DriverBooking);
  const [reload, setReload] = useState(false);
  socket.on('notification', data => {
    setReload(!reload);
    // console.log('data', data);
    // dispatch(DriverBookingActions.setBooking(data.booking));
  });
  const handleValidate = e => {
    axios
      .put(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',
        {
          userId: user.id,
          bookingId: DriverBooking.newBooking.id,
          state: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data booking validated', res.data);
        dispatch(DriverBookingActions.setBooking(res.data.booking));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    // to do fetch new book
    axios
      .post(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/pending?userId=' + user.id,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data bookings', res.data);
        dispatch(DriverBookingActions.setBooking(res.data.book));
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [reload]);
  const handleStart = e => {
    axios
      .put(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',
        {
          userId: user.id,
          bookingId: DriverBooking.newBooking.id,
          state: 2,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data booking started', res.data);
        dispatch(DriverBookingActions.setBooking(res.data.booking));
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handlePause = e => {
    axios
      .put(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',
        {
          userId: user.id,
          bookingId: DriverBooking.newBooking.id,
          state: 4,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data booking started', res.data);
        dispatch(DriverBookingActions.setBooking(res.data.booking));
      })
      .catch(err => {
        console.log('err', err);
      });
  };


  const handleContinue = e => {
    axios
      .put(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',
        {
          userId: user.id,
          bookingId: DriverBooking.newBooking.id,
          state: 2,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data booking started', res.data);
        dispatch(DriverBookingActions.setBooking(res.data.booking));
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleEnd = e => {
    axios
      .post(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/confirm',
        {
          userId: user.id,
          bookingId: DriverBooking.newBooking.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data booking ended', res.data);
        dispatch(DriverBookingActions.setBooking(res.data.booking));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  console.log('DriverBooking', DriverBooking);
  return (
    <div className="driver-actual-booking">
      {DriverBooking.newBooking ? (
        <>
          <div>
            <img
              // className="small-profile-pic"
              src={DriverBooking.newBooking.rider?.profilePic}
              alt={DriverBooking.newBooking.rider?.firstName}
            />
            <p>{DriverBooking.newBooking.rider?.lastName + ' ' + DriverBooking.newBooking.rider?.firstName}</p>
            <p>from : {DriverBooking.newBooking.start}</p>
            <p>to : {DriverBooking.newBooking.end}</p>
            <p>price : ${DriverBooking.newBooking.price - 3}</p>
            <div>
              {DriverBooking.newBooking.state === 0 && (
                <button className="btn-success" onClick={handleValidate}>
                  Validate
                </button>
              )}
              {DriverBooking.newBooking.state === 1 && (
                <button className="btn-success" onClick={handleStart}>
                  Start
                </button>
              )}
              {DriverBooking.newBooking.state === 2 && !DriverBooking.newBooking.driverConfirm && (
                <button className="btn-success-secondary" onClick={handlePause}>
                  Pause
                </button>
              )}
              {DriverBooking.newBooking.state === 4 && !DriverBooking.newBooking.driverConfirm && (
                <button className="btn-success-secondary" onClick={handleContinue}>
                  Continue
                </button>
              )}
              {(DriverBooking.newBooking.state === 2 || DriverBooking.newBooking.state === 4) && !DriverBooking.newBooking.driverConfirm && (
                <button className="btn-success" onClick={handleEnd}>
                  End
                </button>
              )}
              {DriverBooking.newBooking.driverConfirm && <p>Waiting for rider to confirm else</p>}
              {DriverBooking.newBooking.state < 1 && <button className="btn-error">Cancel</button>}
            </div>
          </div>
          <SmallMap />
          {/* <img className="map" src="map.png" alt="map" /> */}
        </>
      ) : (
        <div>nothing here</div>
      )}
    </div>
  );
};

export default BookRiderHistoryDriver;
