import React, { useEffect, useRef, useState } from 'react';
import cities from 'cities.json';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import './userDetails.css';
import { BiImageAdd } from 'react-icons/bi';
const UserDetailsView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    acceptNewsletters: user.acceptNewsletters,
    country: user.country,
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
  return (
    <div className="user-details-edit">
      <p>Edit Account Details</p>
      <div>
        {image.preview || form.profilePic ? (
          <img src={image.preview || form.profilePic} title='click me to change your profile picture' alt="" className="profilepic" onClick={handleClickImage} />
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
          <p>city</p>
          <select name="city" onChange={handleChangeByName} defaultValue={form.city}>
            <option key="none to select" value={'none'} disabled hidden>
              Select a city
            </option>
            {cities
              .filter(city => city.country === form.country)
              .map((city, j) => {
                return (
                  <option value={city.name} key={`city-${j}`} selected={form.city === city.name}>
                    {city.name}
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
          <p>password</p>
          <input
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChangeByName}
            placeholder="leave it blank to save it unchanged"
          />
        </div>
        <div>
          <p>re-type your password</p>
          <input
            type="password"
            autoComplete="new-password"
            value={form.rePassword}
            onChange={handleChangeByName}
            placeholder="leave it blank to save it unchanged"
          />
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
        <button>Submit</button>
      </div>
      <input type="file" ref={inputFileRef} onChange={handleFileChange} />
    </div>
  );
};

export default UserDetailsView;
