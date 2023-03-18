import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import NotificationCard from './NotificationCard';

const NotificationsView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  //   const [notifications, setNotifications] = useState(null);
  const notifications = useSelector(state => state.Notification.notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('http://localhost:9001/user/notification?userId=' + user.id, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('res.data', res.data);
        dispatch(NotificationActions.setNotifications(res.data.notifications));
      })
      .catch(err => {
        console.log('err', err);
      });
    return () => {
      axios
        .put(
          'http://localhost:9001/user/notification',
          {
            userId: user.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(res => {
          dispatch(NotificationActions.setNotifications(res.data.notifications));
          console.log('res.json', res.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    };
  }, []);

  return (
    notifications && (
      <div>
        {notifications.map((el, i) => {
          return <NotificationCard key={i} text={el.content} viewed={el.viewed} />;
        })}
      </div>
    )
  );
};

export default NotificationsView;
