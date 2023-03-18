import React, { useEffect, useRef, useState } from 'react';
// import cities from 'cities.json';
import { cities } from '../../helpers/cities';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';

import axios from 'axios';
import './userDetails.css';
import { BiImageAdd } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { CountrySelect } from '../CountrySelect';
import { City, State } from 'country-state-city';
const AdminDetailsView = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    acceptNewsletters: user.acceptNewsletters,
    country: user.country,
    province: user.province,
    email: user.email,
    city: user.city,
    password: '',
    rePassword: '',
    phone: user.phone,
    profilePic: user.profilePic,
    sex: user.sex,
  });
  const [image, setImage] = useState({
    preview: null,
    data: null,
  });
  const handleClickImage = e => {
    inputFileRef.current.click();
  };
  const handleFileChange = e => {
    // setIsImageLoading(true);
    console.log(e.target.files);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);

    // setIsImageLoading(false);
  };
  const inputFileRef = useRef(null);
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:9001/front-end/?name=riderloginform&language=EN`)
      .then(res => {
        console.log('countries', res.data.view.content.register.first.inputs.filter(el => el.title === 'Country')[0].values);
        setCountries(res.data.view.content.register.first.inputs.filter(el => el.title === 'Country')[0].values);
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
    if (form.password === form.rePassword) {
      console.log('form', form);
      console.log('image', image);
      const keys = Object.keys(form);
      const data = {
        userId: user.id,
        userSubmit: {},
      };
      keys.forEach(key => {
        if (form[key] !== '') {
          data.userSubmit[key] = form[key];
        }
      });
      console.log('data', data);
      if (image.preview) {
        let formData = new FormData();
        formData.append('addImage', image.data);
        console.log('formData', formData);
        axios
          .post('http://localhost:9001/addImageToServer', formData, {
            headers: {
              Authorization: Token,
            },
          })
          .then(res => {
            data.userSubmit.profilePic = res.data.url;
            axios
              .put('http://localhost:9001/user/', data, {
                headers: {
                  Authorization: Token,
                },
              })
              .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                console.log('user', user);
                navigate('/dashboard');
                console.log('res.data', res.data);
              })
              .catch(err => {
                console.log('err', err);
              });
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        axios
          .put('http://localhost:9001/user/', data, {
            headers: {
              Authorization: Token,
            },
          })
          .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            console.log('user', user);
            navigate('/dashboard');
            console.log('res.data', res.data);
          })
          .catch(err => {
            console.log('err', err);
          });
      }
    }
  };

  const [country, setCountry] = useState('US');

  return (
    <div className="user-details-edit">
      <p>Edit Account Details</p>
      <div>
        {image.preview || form.profilePic ? (
          <img
            src={image.preview || form.profilePic}
            title="click me to change your profile picture"
            alt=""
            className="profilepic"
            onClick={handleClickImage}
          />
        ) : (
          <div className="profile-pic-add-div" onClick={handleClickImage}>
            <BiImageAdd size={25} /> <p>Add an image</p>
          </div>
        )}
        <div>
          <p>firstname</p>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChangeByName} />
        </div>
        <div>
          <p>lastname</p>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChangeByName} />
        </div>
        <div>
          <p>username</p>
          <input type="text" name="userName" value={form.userName} onChange={handleChangeByName} />
        </div>

        <div>
          <p>phone</p>

          <PhoneInput
            countries={['CA', 'US']}
            defaultCountry="CA"
            placeholder="Enter phone number"
            name="phone"
            value={form.phone}
            onChange={value =>
              setForm(prev => {
                prev.phone = value;
                console.log('form', prev);
                return { ...prev };
              })
            }
          />
        </div>

        <div>
          <p>country</p>
          <select name="country" onChange={handleChangeByName} defaultValue={form.country}>
            {countries &&
              countries.map((ell, j) => {
                return (
                  <option value={ell.abbr} key={'select-' + j} selected={ell.abbr === form.country}>
                    {ell.title}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <p>province</p>
          <select name="province" onChange={handleChangeByName} defaultValue={form.province}>
            <option key="none to select" value={'none'} disabled hidden>
              Select a province
            </option>
            {State.getStatesOfCountry(form.country).map((el, i) => {
              return (
                <option key={i} value={el.isoCode} /* selected={form.province === el.isoCode} */>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>city</p>
          <select name="city" onChange={handleChangeByName} defaultValue={form.city}>
            <option key="none to select" value={'none'} disabled hidden>
              Select a city
            </option>
            {City.getCitiesOfState(form.country, form.province).map((el, i) => {
              return (
                <option key={i} value={el.name} /* selected={form.city === el.name} */>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <p>email</p>
          <input type="email" name="email" value={form.email} onChange={handleChangeByName} checked={form.sex === 'F'} />
        </div>

        <div>
          <p>password</p>
          <input
            type="password"
            autoComplete="new-password"
            name="password"
            value={form.password}
            onChange={handleChangeByName}
            placeholder="leave it blank to save it unchanged"
          />
        </div>
        <div>
          <div>
            <p>re-type your password</p>
            {form.password !== form.rePassword && <p className="err-message">no matching</p>}
          </div>
          <input
            type="password"
            autoComplete="new-password"
            name="rePassword"
            value={form.rePassword}
            onChange={handleChangeByName}
            placeholder="leave it blank to save it unchanged"
          />
        </div>
        <div className='inputs-block-sex'>
          <div>
            <input name={'sex'} onChange={handleChangeByName} type="radio" value="M" checked={form.sex === 'M'} />
            <p>Male</p>
          </div>
          <div>
            <input name={'sex'} onChange={handleChangeByName} type="radio" value="F" />
            <p>Female</p>
          </div>
        </div>
        <div>
          <p>newsletters</p>
          <p>
            <input
              type="checkbox"
              name="acceptNewsletters"
              onChange={e =>
                setForm(prev => {
                  prev[e.target.name] = e.target.checked;
                  console.log('form', prev);
                  return { ...prev };
                })
              }
              checked={form.acceptNewsletters}
            />
            I accept newsletters
          </p>
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <input type="file" ref={inputFileRef} onChange={handleFileChange} />
    </div>
  );
};

export default AdminDetailsView;
