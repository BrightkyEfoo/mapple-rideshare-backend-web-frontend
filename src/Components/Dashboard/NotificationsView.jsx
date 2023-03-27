import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';
import NotificationCard from './NotificationCard';

const NotificationsView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSelect, setPageSelect] = useState([]);
  //   const [notifications, setNotifications] = useState(null);
  const notifications = useSelector(state => state.Notification.notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/notification?userId=${user.id}&page=${1}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('res.data', res.data);
        let temp = parseFloat(res.data.count);
        temp = temp / parseFloat(res.data.limit);
        temp = Math.ceil(temp);
        setCount(temp);
        setPageSelect(Array(temp).fill(0));
        dispatch(NotificationActions.setNotifications(res.data.notifications));
      })
      .catch(err => {
        console.log('err', err);
      });
    return () => {
      axios
        .put(
          'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/notification',
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
      <div className="notifications-big-container">
        All Notifications
        {notifications.map((el, i) => {
          return <NotificationCard key={i} text={el.content} viewed={el.viewed} />;
        })}
        <div className="notification-footer-page-select-container">
          {pageSelect.map((el, i) => {
            return (
              <button
                className={selectedPage === i + 1 ? 'actual-page-notification' : 'page-notification'}
                onClick={() => {
                  axios
                    .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/notification?userId=' + user.id + '&page=' + (i + 1), {
                      headers: {
                        Authorization: token,
                      },
                    })
                    .then(res => {
                      setSelectedPage(i + 1);
                      console.log('res.data', res.data);
                      dispatch(NotificationActions.setNotifications(res.data.notifications));
                    })
                    .catch(err => {
                      console.log('err', err);
                    });
                }}
                key={i}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    )
  );
};

export default NotificationsView;
