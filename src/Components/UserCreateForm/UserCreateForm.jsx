import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { validateEmail, validateName } from '../../helpers';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { UserCreateOrEditActions } from '../../rtk/features/UserCreateOrEditFormSlice';
import { useNavigate } from 'react-router-dom';
// import cities from 'cities.json';
import { cities } from '../../helpers/cities';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { userListActions } from '../../rtk/features/AdminUserListReload';
import { City, State } from 'country-state-city';

const UserCreateForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.UserCreateOrEdit.userTemplate); //and this is the user to edit
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    number: user?.number || '',
    code: user?.code || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    sex: user?.sex || '',
    password: '',
    rePassword: '',
    phone: user?.phone || '',
    city: user?.city || 'none',
    acceptNewsletters: user?.acceptNewsletters || false,
    email: user?.email || '',
    accessLevel: user?.accessLevel || 0,
    country: user?.country || 'CA',
    province : user?.province || 'none'
  });
  const Token = 'Bearer ' + localStorage.getItem('token');
  const User = JSON.parse(localStorage.getItem('user')); //this is the admin

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=createuserform&language=EN`)
      .then(res => {
        setData(res.data.view);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);
  const [digitsString, setDigitsString] = useState('');
  const handleDigitsChange = value => {
    setForm(prev => {
      prev.code = value.asNumber;
      return { ...prev };
    });
    setDigitsString(value.asString);
  };
  const handleChangeByName = e => {
    setForm(prev => {
      prev[e.target.name] = e.target.value;
      console.log('form', prev);
      return { ...prev };
    });
  };

  const handleSubmit = () => {
    if (
      form.userName.length >= 3 &&
      (form.password.length >= 8 || (user && form.password.length === 0)) &&
      validateEmail(form.email) &&
      form.password === form.rePassword &&
      validateName(form.firstName) &&
      validateName(form.lastName) &&
      form.sex &&
      form.phone &&
      form.country &&
      form.province &&
      form.city
    ) {
      if (!user?.id) {
        axios
          .post(
            'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/admin',
            { userId: User?.id, submission: form },
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then(res => {
            console.log('res.data', res.data);
            dispatch(UserCreateOrEditActions.setIsVisible(false));
            dispatch(userListActions.reload());
            // navigate('/Board_@ADN0223/dashboard');
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        let data = {
          userId: User.id,
          id: user?.id,
          submission: { ...form },
        };
        Object.keys(form).forEach((el, i) => {
          if (form[el] === '') {
            delete data.submission[el];
          }
        });
        axios
          .put('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/admin', data, {
            headers: {
              Authorization: Token,
            },
          })
          .then(res => {
            console.log('res.data', res.data);
            dispatch(UserCreateOrEditActions.setIsVisible(false));
            dispatch(userListActions.reload());
          })
          .catch(err => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <div className="user-create-or-edit-form-container">
      <div>
        {data && (
          <div className="rider-register-form-1">
            <div>
              <p>{data.content.register.first.title}</p>
              <RxCross1 onClick={() => dispatch(UserCreateOrEditActions.setIsVisible(false))} />
            </div>
            <div className="rider-register-form-1-main">
              {data.content.register.first.inputs.map((el, i) => {
                if (el.type === 'radio') {
                  return (
                    <div key={i}>
                      {el.title.map((ell, j) => {
                        return (
                          <div key={'radio-' + i + '-' + j}>
                            <input name={'sex'} checked={form.sex === ell[0]} onChange={handleChangeByName} type="radio" value={ell[0]} />
                            <p>{ell}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                } else if (el.type === 'select') {
                  if (el.values)
                    return (
                      <div key={i}>
                        <div>
                          <p>{el.title}</p>
                          <select name="country" onChange={handleChangeByName}>
                            {el.values.map((ell, j) => {
                              return (
                                <option value={ell.abbr} key={'select-' + i + '-' + j} selected={form.country === ell.abbr}>
                                  {ell.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <p>Province</p>
                          <select name='province' onChange={handleChangeByName} defaultValue={form.province}>
                          <option key="none to select" value={'none'} disabled hidden>
                              Select a province
                            </option>
                            {
                              State.getStatesOfCountry(form.country).map((el,i)=>{
                                return <option key={i} value={el.isoCode}>{el.name}</option>
                              })
                            }
                          </select>
                        </div>
                        <div>
                          <p>{el.subTitle}</p>
                          <select name="city" onChange={handleChangeByName} defaultValue={form.city}>
                            <option key="none to select" value={'none'} disabled hidden>
                              Select a city
                            </option>
                            {
                              City.getCitiesOfState(form.country,form.province).map((el,i)=>{
                                return <option key={i} value={el.name}>{el.name}</option>
                              })
                            }

                          </select>
                        </div>
                      </div>
                    );
                } else if (el.type === 'phone') {
                  return (
                    <div key={i}>
                      <PhoneInput
                        defaultCountry="CA"
                        countries={['CA', 'US']}
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
                  );
                } else if (el.type === 'checkbox') {
                  return (
                    <div key={i}>
                      <input
                        type="checkbox"
                        name={el.name}
                        checked={form.acceptNewsletters}
                        onChange={e =>
                          setForm(prev => {
                            prev[e.target.name] = e.target.checked;
                            console.log('form', prev);
                            return { ...prev };
                          })
                        }
                      />
                      <p>{el.title}</p>
                    </div>
                  );
                } else if (el.type === 'number') {
                  return (
                    <div className="admin-create-user-access-level" key={i}>
                      <p>{el.title}</p>
                      <input type={el.type} min={0} max={2} name={el.name} value={form.accessLevel} onChange={handleChangeByName} />
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <p>{el.title}</p>
                      <input
                        type={el.type}
                        name={
                          el.title === 'Username'
                            ? 'userName'
                            : el.title === 'Email'
                            ? 'email'
                            : el.title === 'Password'
                            ? 'password'
                            : el.title === 'Password again'
                            ? 'rePassword'
                            : el.title === 'First name'
                            ? 'firstName'
                            : 'lastName'
                        }
                        autoComplete={el.type === 'password' ? 'new-password' : 'off'}
                        placeholder={el.placeholder}
                        value={
                          form[
                            el.title === 'Username'
                              ? 'userName'
                              : el.title === 'Email'
                              ? 'email'
                              : el.title === 'Password'
                              ? 'password'
                              : el.title === 'Password again'
                              ? 'rePassword'
                              : el.title === 'First name'
                              ? 'firstName'
                              : 'lastName'
                          ]
                        }
                        onChange={handleChangeByName}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div>
              {User?.accessLevel === 3 && (
                <button
                  className={
                    form.userName.length >= 3 &&
                    validateEmail(form.email) &&
                    (form.password.length >= 8 || (user && form.password.length === 0)) &&
                    form.password === form.rePassword &&
                    validateName(form.firstName) &&
                    validateName(form.lastName) &&
                    form.sex &&
                    form.phone &&
                    form.country &&
                    form.province &&
                    form.city
                      ? 'canSubmit'
                      : 'simple'
                  }
                  onClick={handleSubmit}
                >
                  {data.content.register.first.button.title}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCreateForm;
