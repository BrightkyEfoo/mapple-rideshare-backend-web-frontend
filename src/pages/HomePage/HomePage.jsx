import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Section1 from '../../Components/HomePageSections/Section1';
import axios from 'axios';
import './style.css';
import Section2 from '../../Components/HomePageSections/Section2';
import Section3 from '../../Components/HomePageSections/Section3';
import Section4 from '../../Components/HomePageSections/Section4';

const HomePage = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://mapple-rideshare-backend-nau5m.ondigitalocean.app/front-end/?name=homepage&language=EN`)
      .then(res => {
        // console.log('res.data', res.data);
        setData(res.data.view);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);
  return data ? (
    <div className="homepage-container">
      <NavBar />
      <div>
        <Section1 data={data.content.section1} />
        <Section2 data={data.content.section2} />
        <Section3 data={data.content.section3} />
        <Section4 data={data.content.section4} />
      </div>
      <Footer />
    </div>
  ) : null;
};

export default HomePage;
