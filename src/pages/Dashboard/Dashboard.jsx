import React from 'react';
import './style.css'
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import SideBar from '../../Components/Dashboard/SideBar';
import MainDashboard from '../../Components/Dashboard/MainDashboard';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer '+localStorage.getItem('token')
  console.log('user', user)
  return user.isValidated ? (
    <div>
      <NavBar />
      <div className='dashboard-super-container'>
        <SideBar />
        <MainDashboard />
      </div>
      <Footer />
    </div>
  ) : <div>401 Unauthorized</div>
};

export default Dashboard;
