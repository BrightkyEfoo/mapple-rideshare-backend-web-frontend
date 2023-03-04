import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch } from 'react-redux';
import { RiderLoginFormActions } from '../../rtk/features/RiderLoginFormSlice';

const NavBar = () => {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
    if (user && user.id) {
      navigate('/dashboard');
    } else {
      dispatch(RiderLoginFormActions.setType('driver'));
      dispatch(RiderLoginFormActions.setIsVisible(true));
    }
  };

  const handleClick3 = e => {
    if (user && user.id) {
      navigate(user.accessLevel === 3 ? '/maple-ride-admin/dashboard' : '/maple-ride-subadmin/dashboard');
    } 
  };
  return data ? (
    <div className="navbar-container">
      <div>
        <img className="logo" src={data.content.logo} onClick={() => navigate('/')} alt="mapple rideshare logo" />
      </div>
      <div>
        {data.content.links.map((el, i) => {
          return (
            <div key={i} onClick={e => handleClik(e, i, el)}>
              {el.name}
            </div>
          );
        })}
        {(user?.accessLevel <= 1 || !user)&& (
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
              <button className={user && user.id && user.accessLevel === 1 ? ' empty df' : 'empty'} /*onClick={handleClick2}*/>
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
  ) : null;
};

export default NavBar;
