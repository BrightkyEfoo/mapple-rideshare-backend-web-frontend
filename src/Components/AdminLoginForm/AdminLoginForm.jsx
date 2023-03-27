import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

const AdminLoginForm = ({ type }) => {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const Location = useLocation();
  // console.log('location', Location)
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=adminloginform&language=EN`)
      .then(res => {
        setData(res.data.view.content);
        document.title = `${type} login`;
        // setForm(prev => ({...prev , accessLevel : Location.pathname === '/Board_@ADN0223' ? 3 : 0}))
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);
  const handleChangeByName = e => {
    setForm(prev => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };
  const handleSubmit = e => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    axios
      .post('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/admin/login', { ...form, type })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        navigate(Location.pathname + '/dashboard');
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    data && (
      <div className="admin-login-form">
        <img src={data.logo} alt="logo" />
        <h1>{data.title}</h1>
        {data.inputs.map((el, i) => {
          return (
            <div key={i}>
              <label>{el.label}</label>
              <input type={el.type} name={el.type} onChange={handleChangeByName} value={form[el.type]} />
            </div>
          );
        })}
        <button type="button" onClick={handleSubmit}>
          {data.button.value}
        </button>
        <p>{data.forgot.value}</p>
        <p>{data.footer.title}</p>
      </div>
    )
  );
};

export default AdminLoginForm;
