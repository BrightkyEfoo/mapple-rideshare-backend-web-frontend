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
import cities from 'cities.json';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { validateEmail, validateName } from '../../helpers';

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
  const [form, setForm] = useState({
    number: '',
    code: '',
    firstName: '',
    lastName: '',
    userName: '',
    sex: '',
    password: '',
    rePassword: '',
    phone: '',
    city: '',
    acceptTerms: false,
    acceptNewsletters: false,
    email: '',
    country: 'CA',
  });
  const isVisible = useSelector(state => state.RiderLoginForm.isVisible);
  const position = useSelector(state => state.RiderLoginForm.position);
  //   const location = useLocation();
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=riderloginform&language=EN`)
      .then(res => {
        setData(res.data.view);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  const handleChangeByName = e => {
    setForm(prev => {
      prev[e.target.name] = e.target.value;
      console.log('form', prev);
      return { ...prev };
    });
  };

  const handleSubmit1 = e => {
    if (
      form.userName.length >= 3 &&
      validateEmail(form.email) &&
      form.password.length >= 8 &&
      form.password === form.rePassword &&
      validateName(form.firstName) &&
      validateName(form.lastName) &&
      form.sex &&
      form.phone &&
      form.country &&
      form.city &&
      form.acceptTerms
    ) {
      axios
        .post('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user', form)
        .then(res => {
          console.log('res.data', res.data);
          localStorage.setItem('token', res.data.token);
          // localStorage.setItem('user', JSON.stringify(res.data.user))
        })
        .catch(err => {
          console.log('err', err);
        });
      dispatch(RiderLoginFormActions.goForward());
    }
  };
  const handleSubmit2 = e => {
    const token = 'Bearer '+localStorage.getItem('token')
    axios
      .post('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/verify-email', form , {
        headers : {
          Authorization : token
        }
      })
      .then(res => {
        console.log('res.data', res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch(RiderLoginFormActions.setIsVisible(false));
        dispatch(RiderLoginFormActions.setPosition(0));
        navigate('/dashboard');
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const handleDigitsChange = value => {
    setForm(prev => {
      prev.code = value.asNumber;
      return { ...prev };
    });
  };

  const handleLogin1 = abc => {
    if (validateEmail(form.email) && form.password.length >= 8) {
      axios
        .post('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/login', { email: form.email, password: form.password })
        .then(res => {
          console.log('res.data', res.data);
          dispatch(RiderLoginFormActions.goForward());
        })
        .catch(err => {
          setLoginError({ isError: true, msg: err.response.data.msg });
          setTimeout(() => {
            setLoginError({ isError: false, msg: '' });
          }, 1000);
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
                          <p>{el.title}</p>
                          <select name="country" onChange={handleChangeByName}>
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
                          <p>{el.subTitle}</p>
                          <select name="city" onChange={handleChangeByName} defaultValue={'none'}>
                            <option key="none to select" value={'none'} disabled hidden>
                              Select a city
                            </option>
                            {cities
                              .filter(city => city.country === form.country)
                              .map((city, j) => {
                                return (
                                  <option value={city.name} key={`city-${i}-${j}`}>
                                    {city.name}
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
                      <p>{el.title}</p>
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
                        onChange={handleChangeByName}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div>
              <button
                className={
                  form.userName.length >= 3 &&
                  validateEmail(form.email) &&
                  form.password.length >= 8 &&
                  form.password === form.rePassword &&
                  validateName(form.firstName) &&
                  validateName(form.lastName) &&
                  form.sex &&
                  form.phone &&
                  form.country &&
                  form.city &&
                  form.acceptTerms
                    ? 'canSubmit'
                    : 'simple'
                }
                onClick={handleSubmit1}
              >
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
              <button className={form.code.toString().length === 6 ? 'canSubmit' : 'simple'} onClick={handleSubmit2}>
                {data.content.register.second.button.title}
              </button>
            </div>
          </div>
        )}
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
              <button className={form.code.toString().length === 6 ? 'canSubmit' : 'simple'} onClick={handleSubmit2}>
                {data.content.login.second.button.title}
              </button>
            </div>
          </div>
        )}
        {loginError.isError && <div className="error-alert">{loginError.msg}</div>}
      </div>
    )
  ) : (
    <div>Loading</div>
  );
};

export default RiderLoginForm;
