import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import './SmallNotif.css';
import { Alert, AlertTitle, Button } from '@mui/material';
import axios from 'axios';

const SmallNotif = ({ severity = 'info' }) => {
  const Notification = useSelector(state => state.Notification);
  const dispatch = useDispatch();
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [timeOutSetted, setTimeOutSetted] = useState(false);
  useEffect(() => {
    if (!timeOutSetted) {
      setTimeout(() => {
        dispatch(NotificationActions.setIsVisible(false));
        dispatch(NotificationActions.clear());
      }, 60000);
      setTimeOutSetted(true);
    }
  }, []);

  return (
    <div
      className="notification-container"
      onClick={e => {
        if (e.currentTarget === e.target) {
          dispatch(NotificationActions.setIsVisible(false));
        }
      }}
    >
      {/* <div>
        <RxCross1
          onClick={() => {
            dispatch(NotificationActions.setIsVisible(false));
          }}
          className='exit-button'
          size={25}
        />
        <p>{Notification?.content}</p>
        <div>{Notification.actions&& Array.isArray(Notification.actions) && Notification.actions.map((el , i)=>{
          return <button key={i} onClick={el.handle}> {el.content} </button>
        })}</div>
      </div> */}
      <Alert
        severity={severity}
        onClose={() => {
          if (Notification.onClose) {
            Notification.onClose();
          }

          dispatch(NotificationActions.setIsVisible(false));
        }}
      >
        <>
          <AlertTitle>{Notification?.content}</AlertTitle>
          <div>
            {Notification.actions &&
              Array.isArray(Notification.actions) &&
              Notification.actions.map((el, i) => {
                return (
                  <button
                  className={i===0 ? 'btn-primary-success' : 'btn-primary-error'}
                    key={i}
                    onClick={() => {
                      if (el.id === 1) {
                        axios
                          .post(
                            'http://localhost:9001/map/booking/confirm',
                            {
                              userId: user.id,
                              bookingId: Notification.data.booking.id,
                            },
                            {
                              headers: {
                                Authorization: token,
                              },
                            }
                          )
                          .then(res => {
                            console.log("c'est censé donner");
                            dispatch(NotificationActions.setIsVisible(false));

                            dispatch(
                              NotificationActions.setRate({
                                isVisible: true,
                                bookingId: Notification.data.booking.id,
                              })
                            );
                            console.log('res.data', res.data);
                          })
                          .catch(err => {
                            console.log('err', err);
                          });
                      } else {
                        dispatch(NotificationActions.setIsVisible(false));
                      }
                    }}
                    color={i === 0 ? 'success' : 'error'}
                    variant={'contained'}
                  >
                    {' '}
                    {el.content}{' '}
                  </button>
                );
              })}
          </div>
        </>
      </Alert>
    </div>
  );
};

export default SmallNotif;
