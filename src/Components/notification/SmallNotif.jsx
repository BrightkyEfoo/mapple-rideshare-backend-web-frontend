import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import './SmallNotif.css';
import { Alert, AlertTitle, Button } from '@mui/material';

const SmallNotif = ({ severity = 'info' }) => {
  const Notification = useSelector(state => state.Notification);
  const dispatch = useDispatch();
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
                  <Button key={i} onClick={el.handle} color={i===0 ? 'success' : 'error'} variant={'contained'}>
                    {' '}
                    {el.content}{' '}
                  </Button>
                );
              })}
          </div>
        </>
      </Alert>
    </div>
  );
};

export default SmallNotif;
