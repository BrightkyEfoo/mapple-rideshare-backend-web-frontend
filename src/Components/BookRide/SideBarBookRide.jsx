import React, { useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationOn } from 'react-icons/md';
import { BookRideActions } from '../../rtk/features/BookRide';
import { HiArrowLeft } from 'react-icons/hi';
import axios from 'axios';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoArrowRedoCircleSharp } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import PlacesAutocomplete from '../Map/PlaceAutoComplete';
import PlaceAutoComplete2 from '../Map/PlaceAutoComplete2';

const SideBarBookRide = ({ data }) => {
  // console.log('data', data)
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const token = 'Bearer ' + localStorage.getItem('token');
  const bookRidePosition = useSelector(state => state.BookRide.position);
  const isTablet = useMediaQuery({ query: '(max-width: 912px)' });
  const bookRide = useSelector(state => state.BookRide);
  const driver = useSelector(state => state.BookRide.selectedDriver);
  const [form, setForm] = useState({
    start: '',
    end: '',
  });
  const handleChangeByName = e => {
    setForm(prev => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };

  const handleClick1 = e => {
    axios
      .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/drivers', {
        params: {
          start: bookRide.route.start,
          end: bookRide.route.end,
          startCoord: bookRide.startCoord,
          endCoord: bookRide.endCoord,
        },
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('res.data', res.data);
        // dispatch(BookRideActions.setRoute(form));
        dispatch(BookRideActions.setDrivers(res.data.drivers));
        // dispatch(BookRideActions.goForward())
        dispatch(BookRideActions.setPrice(res.data.price));
        dispatch(BookRideActions.setDriversVisible(true));
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleClick2 = e => {
    // here we should create the bpooking
    axios
      .post(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',
        {
          DriverId: driver.id,
          RiderId: user.id,
          userId: user.id,
          start: bookRide.route.start,
          end: bookRide.route.end,
          startCoord: bookRide.startCoord,
          endCoord: bookRide.endCoord,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data', res.data);
        console.log('aaaaaa');
        dispatch(BookRideActions.setActualBooking(res.data.booking));
        dispatch(BookRideActions.goForward());
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleClick3 = (e, i) => {
    if (i === 0) {
      dispatch(BookRideActions.goForward());
      // axios.put('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',{state : 1})
    } else {
      axios
        .delete('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/' + bookRide.actualBooking.id, {
          headers: {
            Authorization: token,
          },
          data: {
            userId: user.id,
          },
        })
        .then(res => {
          console.log('res.data', res.data);
          // console.log('aaaaaa')
          // dispatch(BookRideActions.setActualBooking(res.data.booking));
          dispatch(BookRideActions.goBackward());
          dispatch(BookRideActions.goBackward());
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  const handleClick4 = e => {
    axios
      .put(
        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking',
        { state: 2, userId: user.id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data', res.data);
        // console.log('aaaaaa')
        // dispatch(BookRideActions.setActualBooking(res.data.booking));
        dispatch(BookRideActions.goBackward());
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleCompleteRide = () => {
    dispatch(BookRideActions.setIsPaymentDisplay(true));
  };

  return (
    <div>
      {bookRidePosition === 0 && (
        <div className="book-ride-part-1-container">
          <p>{data.part1.title}</p>
          <div>
            {data.part1.inputs.map((el, i) => {
              console.log('el', el);
              return (
                <div
                  key={i}
                  onClick={() => {
                    // if (i === 0) {
                    //   navigator.geolocation.getCurrentPosition(
                    //     position => {
                    //       console.log('position', position);
                    //       const lat = position.coords.latitude;
                    //       const lng = position.coords.longitude;
                    //       dispatch(BookRideActions.setRoute({ ...bookRide.route, start: `${lat.toFixed(2)} , ${lng.toFixed(2)}` }));

                    //       dispatch(BookRideActions.setStartCoord({ lat, lng }));
                    //     },
                    //     err => {
                    //       console.log('err', err);
                    //     }
                    //   );
                    // }
                  }}
                >
                  <label>{el.label}</label>
                  <div>
                    <MdLocationOn color={i === 0 ? '#02A238' : '#ED1A43'} size={17} />
                    {(i === 1 || i===0) && <PlaceAutoComplete2 key={i} point={i === 0 ? 'start' : 'end'} placeholder={el.placeholder} />}
                    {/* {i === 0 && <p>bookRide.startLongNameSelect your location</p>} */}
                  </div>
                </div>
              );
            })}
          </div>
          <button className={bookRide.route.start && bookRide.route.end ? 'success' : 'simple'} onClick={handleClick1}>{data.part1.button.value}</button>
        </div>
      )}
      {bookRidePosition === 1 && (
        <div className="book-ride-part-2-container">
          <p>
            <HiArrowLeft
              size={20}
              onClick={() => {
                dispatch(BookRideActions.goBackward());
              }}
            />{' '}
            {data.part3.title}
          </p>
          <div>
            <img src={driver.profilePic} alt={driver.userName} />
            <div>
              <p>{driver.lastName + ' ' + driver.firstName}</p>
              <p>{driver.phone}</p>
            </div>
          </div>
          <div>
            <p>{data.part3.areas[0].title}</p>
            <p>{driver.vehicleNumber}</p>
          </div>
          <div>
            <p>{data.part3.areas[1].title}</p>
            <p>${parseFloat(bookRide.price).toFixed(2)}</p>
          </div>
          <div>
            <p>
              <MdLocationOn color="#02A238" size={24} /> {bookRide.route.start}
            </p>
            <p>
              <MdLocationOn color="#ED1A43" size={24} /> {bookRide.route.end}
            </p>
          </div>
          <p>{data.part3.main}</p>
          <button onClick={handleClick2}>{data.part3.button.value}</button>
        </div>
      )}
      {bookRidePosition === 2 && (
        <div className="book-ride-part-3-container">
          <IoIosCheckmarkCircle color="#02A238" size={isTablet ? 75 : 150} />
          <p>{data.part4.title}</p>
          <div>
            <img src={driver.profilePic} alt={driver.userName} />
            <p>{driver.lastName + ' ' + driver.firstName}</p>
            <p>{driver.phone}</p>
            <p>
              {driver.vehicleNumber} | ${parseFloat(bookRide.price).toFixed(2)}
            </p>
          </div>
          <div>
            <p>
              <MdLocationOn color="#02A238" size={24} /> {bookRide.route.start}
            </p>
            <p>
              <MdLocationOn color="#ED1A43" size={24} /> {bookRide.route.end}
            </p>
          </div>
          <button
            onClick={e => {
              dispatch(BookRideActions.goForward());
            }}
          >
            {data.part4.button.value}
          </button>
        </div>
      )}
      {(bookRidePosition === 3 || bookRidePosition === 4) && (
        <div className="book-ride-part-4-container">
          <div>
            <p>{bookRidePosition === 3 ? data.part5.title : data.part6.title}</p>
            <div>
              <IoArrowRedoCircleSharp color="#ED1A43" size={50} />
              <button>SOS</button>
            </div>
          </div>
          <div>
            <p>Booking #{bookRide.actualBooking.id}</p>
            <div>
              <img src={bookRide.actualBooking.driver.profilePic} alt={bookRide.actualBooking.driver.userName} />
              <div>
                <p>{bookRide.actualBooking.driver.lastName + ' ' + bookRide.actualBooking.driver.firstName}</p>
                <p>{bookRide.actualBooking.driver.phone}</p>
              </div>
              <button>{data.part5.topButton.value}</button>
            </div>
          </div>
          <div>
            <p>
              <MdLocationOn color="#02A238" size={24} /> {bookRide.route.start}
            </p>
            <p>
              <MdLocationOn color="#ED1A43" size={24} /> {bookRide.route.end}
            </p>
          </div>
          <div>
            <p>{bookRide.actualBooking.driver.vehicleNumber}</p>
            <p>${parseFloat(bookRide.price).toFixed(2)}</p>
          </div>
          <div>
            {bookRidePosition === 3 &&
              data.part5.buttons.map((el, i) => {
                return (
                  <button key={i} onClick={e => handleClick3(e, i)}>
                    {el.value}
                  </button>
                );
              })}
            {bookRidePosition === 4 && <button onClick={() => handleCompleteRide()}>{data.part6.button.value}</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarBookRide;
