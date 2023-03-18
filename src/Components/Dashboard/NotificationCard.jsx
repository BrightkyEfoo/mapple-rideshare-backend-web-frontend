import React from 'react';
import './notification.css';
const NotificationCard = ({ text, viewed }) => {
  return (
    <div className={viewed ? 'notification-card-container' : 'notification-card-container-new'}>
      <p>{text}</p>
    </div>
  );
};

export default NotificationCard;
