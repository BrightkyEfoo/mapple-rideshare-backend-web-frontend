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
      dispatch(RiderLoginFormActions.setIsVisible(true));
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
        <button className={user && user.id ? " filled df" : 'filled'} onClick={handleClick1}>
          {user && user.id ? (
            <>
              <img src={user.profilePic} alt={user.lastName} />
              <p>{user.lastName + ' ' + user.firstName}</p>
            </>
          ) : (
            data.content.buttons[0].name
          )}
        </button>
        <button className="empty">{data.content.buttons[1].name}</button>
      </div>
    </div>
  ) : null;
};

export default NavBar;
