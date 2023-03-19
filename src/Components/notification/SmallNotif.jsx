import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import './SmallNotif.css';
import { Alert, AlertTitle, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookRideActions } from '../../rtk/features/BookRide';

const SmallNotif = ({ severity = 'info' }) => {
  const Notification = useSelector(state => state.Notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const [timeOutSetted, setTimeOutSetted] = useState(false);

  const Close = () => {
    const method = Notification.onClose;
    switch (method) {
      case 'go-dashboard':
        dispatch(BookRideActions.setDrivers(null));
        // dispatch(BookRideActions.goForward())
        dispatch(BookRideActions.setPrice(0));
        dispatch(BookRideActions.setDriversVisible(false));
        dispatch(BookRideActions.setRoute({ start: '', end: '' }));
        dispatch(BookRideActions.setEndCoord({ lat: 0, lng: 0 }));
        dispatch(BookRideActions.setEndCoord({ lat: 0, lng: 0 }));
        dispatch(BookRideActions.setPosition(0));

        navigate('/dashboard');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (!timeOutSetted) {
      setTimeout(() => {
        dispatch(NotificationActions.setIsVisible(false));

        Close();
        // dispatch(NotificationActions.clear());
      }, 60000);
      setTimeOutSetted(true);
    }
  }, []);

  return (
    <div
      className="notification-container"
      onClick={e => {
        if (e.currentTarget === e.target) {
          console.log('onClose', Notification.onClose);
          if (Notification.onClose) {
            Close();
          }
          dispatch(NotificationActions.setIsVisible(false));
        }
      }}
    >
      {Notification.contents.map((el, i) => {
        return (
          <Alert
            key={i}
            severity={el?.severity || 'info'}
            onClose={() => {
              console.log('onClose', Notification.onClose);

              if (Notification.onClose) {
                Close();
              }

              dispatch(NotificationActions.removeContent(el));
            }}
          >
            <>
              <p>{el?.value}</p>
            </>
          </Alert>
        );
      })}
      {/* <Alert
        severity={Notification?.content?.severity || 'info'}
        onClose={() => {
          console.log('onClose', Notification.onClose);

          if (Notification.onClose) {
            Close();
          }

          dispatch(NotificationActions.setIsVisible(false));
        }}
      >
        <>
          <p>{Notification?.content?.value}</p>
          <div>
            {Notification.actions &&
              Array.isArray(Notification.actions) &&
              Notification.actions.map((el, i) => {
                return (
                  <button
                    className={i === 0 ? 'btn-primary-success' : 'btn-primary-error'}
                    key={i}
                    onClick={() => {
                      if (el.id === 1) {
                        axios
                          .post(
                            'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/confirm',
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
      </Alert> */}
    </div>
  );
};

export default SmallNotif;
