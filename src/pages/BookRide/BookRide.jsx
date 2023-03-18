import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import Error from '../../Components/401';
import NavBar2 from '../../Components/NavBar2/NavBar2';
import Footer2 from '../../Components/Footer2/Footer2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SideBarBookRide from '../../Components/BookRide/SideBarBookRide';
import './style.css';
import DriverSmallCard from '../../Components/DriverSmallCard/DriverSmallCard';
import Bigmap from '../../Components/Map/Bigmap';
import { useLoadScript } from '@react-google-maps/api';
const libraries = ['places']
const BookRide = () => {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const bookRide = useSelector(state => state.BookRide);
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC18L8pZJlrJimHPd0CwkD_CmxLda1A8ys',
    libraries
  });
  useEffect(() => {
    axios
      .get(`http://localhost:9001/front-end/?name=bookride&language=EN`)
      .then(res => {
        setData(res.data.view.content);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return user && user.isValidated ? (
    data ? (
      <div>
        <NavBar2 />
        {isLoaded && (
          <div className="book-ride-main-container">
            <div>
              <SideBarBookRide data={data} />
              <div>
                {/* <img className="map" src="map.png" alt="map" /> */}
                <Bigmap />
                <div>
                  {bookRide.isDriversVisible &&
                    bookRide.drivers &&
                    bookRide.drivers?.map((el, i) => {
                      
                      return <DriverSmallCard key={i} text={data.part2.cardsButton.value} price={parseFloat(bookRide.price).toFixed(2)} data={el} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer2 />
      </div>
    ) : null
  ) : (
    <div>
      <NavBar />
      <Error code={401} text={'Unauthorized'} />
      <Footer />
    </div>
  );
};

export default BookRide;
