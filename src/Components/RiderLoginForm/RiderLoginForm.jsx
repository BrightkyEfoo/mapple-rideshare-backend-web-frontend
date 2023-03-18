import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { HiArrowLeft } from 'react-icons/hi';
import './style.css';
import { DigitInputs, Digit } from 'digitinputs-react';
import 'digitinputs-react/dist/index.css';
import { RiderLoginFormActions } from '../../rtk/features/RiderLoginFormSlice';
// import cities from 'cities.json';
import { cities } from '../../helpers/cities';
import { Country, State, City } from 'country-state-city';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { validateEmail, validateName } from '../../helpers';
import { socket } from '../../Socket';

const RiderLoginForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [loginError, setLoginError] = useState({
    msg: '',
    isError: false,
  });
  const navigate = useNavigate();
  // const [logForm , ]
  const [touched, setTouched] = useState({
    number: false,
    code: false,
    firstName: false,
    lastName: false,
    userName: false,
    sex: false,
    password: false,
    rePassword: false,
    reEmail: false,
    phone: false,
    city: false,
    acceptTerms: false,
    acceptNewsletters: false,
    email: false,
    country: false,
    province: false,
  });
  const [form, setForm] = useState({
    number: '',
    code: '',
    firstName: '',
    lastName: '',
    userName: '',
    sex: '',
    password: '',
    rePassword: '',
    reEmail: '',
    phone: '',
    city: '',
    acceptTerms: false,
    acceptNewsletters: false,
    email: '',
    country: 'CA',
    province: '',
  });
  const isVisible = useSelector(state => state.RiderLoginForm.isVisible);
  const position = useSelector(state => state.RiderLoginForm.position);
  const type = useSelector(state => state.RiderLoginForm.type);
  //   const location = useLocation();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/front-end/?name=${type}loginform&language=EN`)
      .then(res => {
        setData(res.data.view);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [type]);

  const handleChangeByName = e => {
    setForm(prev => {
      prev[e.target.name] = e.target.value;
      console.log('form', prev);
      return { ...prev };
    });
  };

  const handleSetTouchedByName = e => {
    if (!touched[e.target.name]) {
      setTouched(prev => {
        prev[e.target.name] = true;
        console.log('touched', prev);
        return { ...prev };
      });
    }
  };
  const handleVerifyByName = name => {
    switch (name) {
      case 'userName':
        return form.userName.length >= 5;
      case 'firstName':
        return validateName(form.firstName);
      case 'lastName':
        return validateName(form.lastName);
      case 'password':
        return form.password.length >= 8;
      case 'email':
        return validateEmail(form.email);
      case 'reEmail':
        return form.email === form.reEmail;
      case 'rePassword':
        return form.rePassword.length >= 8 && form.password === form.rePassword;
      case 'sex':
        return !!form.sex;
      case 'phone':
        return !!form.phone;
      case 'country':
        return !!form.country;
      case 'city':
        return !!form.city;
      case 'province':
        return !!form.province;
      case 'acceptTerms':
        return !!form.acceptTerms;
      default:
        return true;
      // break
    }
  };
  const isAllValid = () => {
    return (
      form.userName.length >= 3 &&
      validateEmail(form.email) &&
      form.password.length >= 8 &&
      form.password === form.rePassword &&
      form.email === form.reEmail &&
      validateName(form.firstName) &&
      validateName(form.lastName) &&
      form.sex &&
      form.phone &&
      form.country &&
      form.city &&
      form.province &&
      form.acceptTerms
    );
  };
  const handleSetName = el => {
    return el.title === 'Username'
      ? 'userName'
      : el.title === 'Email'
      ? 'email'
      : el.title === 'Retype Email'
      ? 'reEmail'
      : el.title === 'Password'
      ? 'password'
      : el.title === 'Password again'
      ? 'rePassword'
      : el.title === 'First name'
      ? 'firstName'
      : 'lastName';
  };
  const handleSubmit1 = e => {
    if (isAllValid()) {
      axios
        .post('http://localhost:9001/user', { ...form, accessLevel: type === 'driver' ? 1 : 0 })
        .then(res => {
          console.log('res.data', res.data);
          localStorage.setItem('token', res.data.token);
          dispatch(RiderLoginFormActions.goForward());
          // localStorage.setItem('user', JSON.stringify(res.data.user))
        })
        .catch(err => {
          setLoginError({ isError: true, msg: err.response.data.msg });
          setTimeout(() => {
            setLoginError({ isError: false, msg: '' });
          }, 5000);
          console.log('err', err);
        });
    } else {
      setTouched({
        number: true,
        code: true,
        firstName: true,
        lastName: true,
        userName: true,
        sex: true,
        password: true,
        rePassword: true,
        reEmail: true,
        phone: true,
        city: true,
        acceptTerms: true,
        acceptNewsletters: true,
        email: true,
        country: true,
        province: true,
      });
    }
  };
  const handleSubmit2 = e => {
    const token = 'Bearer ' + localStorage.getItem('token');
    axios
      .post(
        'http://localhost:9001/user/verify-email',
        { ...form },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data', res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch(RiderLoginFormActions.setIsVisible(false));
        dispatch(RiderLoginFormActions.setPosition(0));
        // socket.connect({userId : res.data.user.id})
        socket.emit('login', { userId: res.data.user.id });
        navigate('/dashboard');
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const [digitsString, setDigitsString] = useState('');
  const handleDigitsChange = value => {
    setForm(prev => {
      prev.code = value.asNumber;
      return { ...prev };
    });
    setDigitsString(value.asString);
  };

  const handleLogin1 = () => {
    if (validateEmail(form.email) && form.password.length >= 8) {
      axios
        .post('http://localhost:9001/user/login', { email: form.email, password: form.password, accessLevel: type === 'driver' ? 1 : 0 })
        .then(res => {
          console.log('res.data', res.data);
          localStorage.setItem('token', res.data.token);
          dispatch(RiderLoginFormActions.goForward());
        })
        .catch(err => {
          setLoginError({ isError: true, msg: err.response.data.msg });
          setTimeout(() => {
            setLoginError({ isError: false, msg: '' });
          }, 5000);
          console.log('err', err);
        });
    }
  };
  return data ? (
    isNew ? (
      <div className="rider-register-form">
        {/* first part of register form */}
        {position === 0 && (
          <div className="rider-register-form-1">
            <div>
              <p>{data.content.register.first.title}</p>
              <RxCross1 onClick={() => dispatch(RiderLoginFormActions.setIsVisible(false))} />
            </div>
            <div className="rider-register-form-1-main">
              {data.content.register.first.inputs.map((el, i) => {
                if (el.type === 'radio') {
                  return (
                    <div key={i}>
                      {!handleVerifyByName('sex') && touched.sex && <p className="small-error-alert-text">{el.error}</p>}
                      {el.title.map((ell, j) => {
                        return (
                          <div key={'radio-' + i + '-' + j}>
                            <input name={'sex'} onChange={handleChangeByName} type="radio" value={ell[0]} />
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
                          <p>
                            {el.title}{' '}
                            {touched.country && !handleVerifyByName('country') && (
                              <span className="small-error-alert-text">Please choose a country</span>
                            )}
                          </p>
                          <select name="country" onChange={handleChangeByName} onBlur={handleSetTouchedByName}>
                            {el.values.map((ell, j) => {
                              return (
                                <option value={ell.abbr} key={'select-' + i + '-' + j}>
                                  {ell.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <p>
                            Province{' '}
                            {touched.province && !handleVerifyByName('province') && (
                              <span className="small-error-alert-text">Please choose a province</span>
                            )}
                          </p>
                          <select name="province" onChange={handleChangeByName} defaultValue={'none'} onBlur={handleSetTouchedByName}>
                            <option key="none to select" value={'none'} disabled hidden>
                              Select a province
                            </option>
                            {State.getStatesOfCountry(form.country).map((el, i) => {
                              return (
                                <option key={i} value={el.isoCode}>
                                  {el.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <p>
                            {el.subTitle}{' '}
                            {touched.city && !handleVerifyByName('city') && (
                              <span className="small-error-alert-text">Please choose a city</span>
                            )}
                          </p>
                          <select name="city" onChange={handleChangeByName} defaultValue={'none'} onBlur={handleSetTouchedByName}>
                            <option key="none to select" value={'none'} disabled hidden>
                              Select a city
                            </option>
                            {City.getCitiesOfState(form.country, form.province).map((el, i) => {
                              return (
                                <option key={i} value={el.name}>
                                  {el.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    );
                } else if (el.type === 'phone') {
                  return (
                    <div key={i}>
                      <p>
                        {el.title}{' '}
                        {touched.phone && !handleVerifyByName('phone') && <span className="small-error-alert-text">{el.error}</span>}
                      </p>
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
                        onBlur={handleSetTouchedByName}
                      />
                    </div>
                  );
                } else if (el.type === 'checkbox') {
                  return (
                    <div key={i}>
                      <input
                        type="checkbox"
                        name={el.name}
                        onChange={e =>
                          setForm(prev => {
                            prev[e.target.name] = e.target.checked;
                            console.log('form', prev);
                            return { ...prev };
                          })
                        }
                      />
                      <p>
                        {el.title}{' '}
                        {el.name === 'acceptTerms' && !handleVerifyByName('acceptTerms') && touched.acceptTerms && (
                          <span className="small-error-alert-text">{el.error}</span>
                        )}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <p className="register-input-label">
                        {el.title}{' '}
                        {touched[handleSetName(el)] && !handleVerifyByName(handleSetName(el)) && (
                          <span className="small-error-alert-text">{el.error}</span>
                        )}
                      </p>
                      <input
                        type={el.type}
                        name={handleSetName(el)}
                        autoComplete={el.type === 'password' ? 'new-password' : 'off'}
                        placeholder={el.placeholder}
                        onChange={handleChangeByName}
                        onBlur={handleSetTouchedByName}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div>
              <button className={isAllValid() ? 'canSubmit' : 'simple'} onClick={handleSubmit1}>
                {data.content.register.first.button.title}
              </button>
            </div>
          </div>
        )}

        {position === 1 && (
          <div className="rider-login-form-2">
            <div>
              <HiArrowLeft
                onClick={() => {
                  dispatch(RiderLoginFormActions.goBack());
                }}
              />
              <p>{data.content.register.second.title}</p>
            </div>
            <div>
              <p>
                {data.content.register.second.main.title1} <span className="bold">{form.email}</span>{' '}
                {data.content.register.second.main.title2}
              </p>
              <DigitInputs className="rider-login-form-2-digits-input" onDigitsChange={handleDigitsChange}>
                <Digit />
                <Digit />
                <Digit />
                <Digit />
                <Digit />
                <Digit />
              </DigitInputs>
              <p>{data.content.register.second.main.button}</p>
            </div>
            <div>
              <button className={digitsString.length === 6 ? 'canSubmit' : 'simple'} onClick={handleSubmit2}>
                {data.content.register.second.button.title}
              </button>
            </div>
          </div>
        )}
        {loginError.isError && <div className="error-alert">{loginError.msg}</div>}
      </div>
    ) : (
      <div className="rider-login-form">
        {/* first part of login form */}
        {position === 0 && (
          <div className="rider-login-form-1">
            <div>
              <p>{data.content.login.first.title}</p>
              <RxCross1 onClick={() => dispatch(RiderLoginFormActions.setIsVisible(false))} />
            </div>
            <div>
              {data.content.login.first.inputs.map((el, i) => {
                return (
                  <div key={i}>
                    <p>{el.title}</p>
                    <input
                      // name={el.title === 'Email' ? 'email' : 'passowrd'}
                      type={el.type}
                      onChange={handleChangeByName}
                      placeholder={el.placeholder}
                      name={el.title.toLowerCase()}
                    />
                  </div>
                );
              })}
            </div>
            <p>{data.content.login.first.forgot.title}</p>
            <div>
              <button onClick={handleLogin1} className={validateEmail(form.email) && form.password.length >= 8 ? 'canSubmit' : 'simple'}>
                {data.content.login.first.button.title}
              </button>
            </div>
            <div>
              <p>{data.content.login.first.signup.title}</p>
              <p
                onClick={() => {
                  setIsNew(true);
                }}
              >
                {data.content.login.first.signup.button.title}
              </p>
            </div>
          </div>
        )}

        {/* second part of login form */}
        {position === 1 && (
          <div className="rider-login-form-2">
            <div>
              <HiArrowLeft
                onClick={() => {
                  dispatch(RiderLoginFormActions.goBack());
                }}
              />
              <p>{data.content.login.second.title}</p>
            </div>
            <div>
              <p>
                {data.content.login.second.main.title1} <span className="bold">{form.email}</span> {data.content.login.second.main.title2}
              </p>
              <DigitInputs className="rider-login-form-2-digits-input" onDigitsChange={handleDigitsChange}>
                <Digit />
                <Digit />
                <Digit />
                <Digit />
                <Digit />
                <Digit />
              </DigitInputs>
              <p>{data.content.login.second.main.button}</p>
            </div>
            <div>
              <button className={digitsString.length === 6 ? 'canSubmit' : 'simple'} onClick={handleSubmit2}>
                {data.content.login.second.button.title}
              </button>
            </div>
          </div>
        )}
        {loginError.isError && <div className="error-alert">{loginError.msg}</div>}
      </div>
    )
  ) : null;
};

export default RiderLoginForm;
