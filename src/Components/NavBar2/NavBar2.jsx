import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

const NavBar2 = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  // const dispatch()
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=navbar2&language=EN`)
      .then(res => {
        setData(res.data.view.content);
        // console.log(res.data)
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  const handleClick = e => {
    navigate('/dashboard')
  }
  return data ? (
    <div className='navbar-container'>
      <img className='logo' src={data.logo} alt="logo" onClick={(e)=>navigate('/')} />
      <div>
        <button className={user && user.id && user.accessLevel === 0 ? ' filled df' : 'filled'} onClick={handleClick}>
          {user && user.accessLevel === 0 ? (
            <>
              <img src={user.profilePic} alt={user.userName} />
              <p>{user.firstName + ' ' + user.lastName}</p>
              <div className="small-triangle"></div>
            </>
          ) : (
            <>{data.buttons.isDriver}</>
          )}
        </button>
        <button className={user && user.id && user.accessLevel === 1 ? ' empty df' : 'empty'} onClick={handleClick}>
          {user && user.accessLevel === 1 ? (
            <>
              <img src={user.profilePic} alt={user.userName} />
              <p>{user.firstName + ' ' + user.lastName}</p>
              <div className="small-triangle"></div>
            </>
          ) : (
            <>{data.buttons.isRider}</>
          )}
        </button>
      </div>
    </div>
  ) : null;
};

export default NavBar2;
