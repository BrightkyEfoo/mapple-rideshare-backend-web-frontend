import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Footer2 = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  // const dispatch()
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=footer2&language=EN`)
      .then(res => {
        setData(res.data.view.content);
        // console.log(res.data)
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);
  return data ? (
    <div className="footer2-container">
      <div>
        <img className="logo" alt="logo" src={data.logo} />
        <div>
          {data.links.map((el, i) => {
            return (
              <React.Fragment key={i}>
                <p onClick={() => navigate(el.url)}>{el.name}</p>
                {i < data.links.length - 1 && <span>|</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <p>{data.title}</p>
    </div>
  ) : null;
};

export default Footer2;
