import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RiderLoginFormActions } from '../../rtk/features/RiderLoginFormSlice';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { Badge } from '@mui/material';
import { FaBell } from 'react-icons/fa';
import { NavBarActions } from '../../rtk/features/NavBarSlice';
import { NotificationActions } from '../../rtk/features/Notificarion';

const NavBar = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const token = 'Bearer ' + localStorage.getItem('token');
  //   const [notifications, setNotifications] = useState(null);
  const notifications = useSelector(state => state.Notification.notifications);
  useEffect(() => {
    if (user) {
      axios
        .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/notification?userId=' + user.id, {
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
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=navbar&language=EN`)
      .then(res => {
        setData(res.data.view);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  const handleClik = (e, i, el) => {
    switch (i) {
      case 0:
        navigate(el.url);
        break;
      default:
        break;
    }
  };
  const handleClick1 = e => {
    if (user && user.id) {
      navigate('/dashboard');
    } else {
      dispatch(RiderLoginFormActions.setType('rider'));
      dispatch(RiderLoginFormActions.setIsVisible(true));
    }
  };
  const handleClick2 = e => {
    // if (user && user.id) {
    //   navigate('/dashboard');
    // } else {
    //   dispatch(RiderLoginFormActions.setType('driver'));
    //   dispatch(RiderLoginFormActions.setIsVisible(true));
    // }
  };

  const handleClick3 = e => {
    if (user && user.id) {
      navigate('/maple-ride-admin/dashboard');
    }
  };
  return data ? (
    <div className="navbar-container">
      <div>
        <img className="logo" src={data.content.logo} onClick={() => navigate('/')} alt="mapple rideshare logo" />
      </div>
      {!isTabletOrMobile && (
        <div>
          {data.content.links.map((el, i) => {
            return (
              <div key={i} onClick={e => handleClik(e, i, el)}>
                {el.name}
              </div>
            );
          })}
          {(user?.accessLevel <= 1 || !user) && (
            <>
              {!(user && user.id && user.accessLevel === 1) && (
                <button className={user && user.id && user.accessLevel === 0 ? ' filled df' : 'filled'} onClick={handleClick1}>
                  {user && user.id && user.accessLevel === 0 ? (
                    <>
                      <img src={user.profilePic} alt={user.lastName} />
                      <p>{user.lastName + ' ' + user.firstName}</p>
                    </>
                  ) : (
                    data.content.buttons[0].name
                  )}
                </button>
              )}
              {!(user && user.id && user.accessLevel === 0) && (
                <button className={user && user.id && user.accessLevel === 1 ? ' empty df' : 'empty'} onClick={handleClick2}>
                  {user && user.id && user.accessLevel === 1 ? (
                    <>
                      <img src={user.profilePic} alt={user.lastName} />
                      <p>{user.lastName + ' ' + user.firstName}</p>
                    </>
                  ) : (
                    data.content.buttons[1].name
                  )}
                </button>
              )}
            </>
          )}
          {user && user.accessLevel > 1 && (
            <button className="filled df" onClick={handleClick3}>
              <img src={user.profilePic} alt={user.lastName} />
              <p>{user.lastName + ' ' + user.firstName}</p>
            </button>
          )}
          {user && (
            <div className="notification-navabar-container">
              {notifications && Array.isArray(notifications) && notifications.filter(el => !el.viewed).length !== 0 && (
                <p className="notification-navbar-counter">{notifications.filter(el => !el.viewed).length}</p>
              )}
              <FaBell
                color="action"
                size={20}
                onClick={() => {
                  // axios
                  //   .put(
                  //     'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/notification',
                  //     {
                  //       userId: user.id,
                  //     },
                  //     {
                  //       headers: {
                  //         Authorization: token,
                  //       },
                  //     }
                  //   )
                  //   .then(res => {
                  //     console.log('res.json', res.data);
                  //   }).catch(err => {
                  //     console.log('err', err)
                  //   })
                  navigate('/dashboard');
                  dispatch(NavBarActions.setSelected(7));
                }}
              />
            </div>
          )}
        </div>
      )}
      {isTabletOrMobile && (
        <div id="navbar-mobile-container">
          <button id="navbar-menu-button" onClick={() => setIsDisplayed(!isDisplayed)}>
            {isDisplayed ? <CgClose size={25} color="white" /> : <FiMenu size={25} />}
          </button>
          {isDisplayed && (
            <div>
              {data.content.links.map((el, i) => {
                return (
                  <div key={i} onClick={e => handleClik(e, i, el)}>
                    {el.name}
                  </div>
                );
              })}
              <div>
                {(user?.accessLevel <= 1 || !user) && (
                  <>
                    {!(user && user.id && user.accessLevel === 1) && (
                      <button className={user && user.id && user.accessLevel === 0 ? ' filled df' : 'filled'} onClick={handleClick1}>
                        {user && user.id && user.accessLevel === 0 ? (
                          <>
                            <img src={user.profilePic} alt={user.lastName} />
                            <p>{user.lastName + ' ' + user.firstName}</p>
                          </>
                        ) : (
                          data.content.buttons[0].name
                        )}
                      </button>
                    )}
                    {!(user && user.id && user.accessLevel === 0) && (
                      <button className={user && user.id && user.accessLevel === 1 ? ' empty df' : 'empty'} onClick={handleClick2}>
                        {user && user.id && user.accessLevel === 1 ? (
                          <>
                            <img src={user.profilePic} alt={user.lastName} />
                            <p>{user.lastName + ' ' + user.firstName}</p>
                          </>
                        ) : (
                          data.content.buttons[1].name
                        )}
                      </button>
                    )}
                  </>
                )}
                {user && user.accessLevel > 1 && (
                  <button className="filled df" onClick={handleClick3}>
                    <img src={user.profilePic} alt={user.lastName} />
                    <p>{user.lastName + ' ' + user.firstName}</p>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default NavBar;
