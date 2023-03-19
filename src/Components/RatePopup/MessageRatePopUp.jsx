import { Button, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
// import { Close } from '@mui/icons-material';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { NavBarActions } from '../../rtk/features/NavBarSlice';

const MessageRatePopUp = () => {
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const rateNotif = useSelector(state => state.Notification.Rate);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    axios
      .post(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/booking/rates/',
        {
          bookingId: rateNotif.bookingId,
          userId: user.id,
          submission: {
            rate: value,
            message,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        // navigate('/')
        // navigate('/dashboard');
        dispatch(NotificationActions.setRate({ isVisible: false }));
        // dispatch(NavBarActions.setSelected(10));
        // setTimeout(() => {
        //   dispatch(NavBarActions.setSelected(1));
        // }, 200);
        dispatch(NavBarActions.reload())
        console.log('res.data', res.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <div
      className="message-rate-popup"
      onClick={e => {
        if (e.currentTarget === e.target) {
          dispatch(NotificationActions.setRate({ isVisible: false }));
        }
      }}
    >
      <div>
        <button
          className="message-rate-popup-close-button"
          onClick={e => {
            dispatch(NotificationActions.setRate({ isVisible: false }));
          }}
        >
          <GrClose size={25} />
        </button>
        <p>Rate your ride</p>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          size="large"
        />
        <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea> <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default MessageRatePopUp;
