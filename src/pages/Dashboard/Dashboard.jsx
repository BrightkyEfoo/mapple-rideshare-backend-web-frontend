import React from 'react';
import './style.css'
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import SideBar from '../../Components/Dashboard/SideBar';
import MainDashboard from '../../Components/Dashboard/MainDashboard';
import Error from '../../Components/401';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer '+localStorage.getItem('token')
  console.log('user', user)
  return (
    <div>
      
      <NavBar />
      {user&&token ? 
      <div className='dashboard-super-container'>
        <SideBar />
        <MainDashboard />
      </div> :  <Error code={401} text={'Unauthorized'} />}
      <Footer />
    </div>)
  // ) : <div>401 Unauthorized</div>
};

export default Dashboard;
