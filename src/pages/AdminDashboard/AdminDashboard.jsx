import React from 'react';
import './style.css'
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import MainAdminDashboard from '../../Components/AdminDashboard/MainAdminDashboard';
import AdminSideBar from '../../Components/AdminDashboard/AdminSideBar';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer '+localStorage.getItem('token')
  // console.log('user', user)
  // useEffect
  return user && user.isValidated ? (
    <div>
      <NavBar />
      <div className='dashboard-super-container'>
        <AdminSideBar />
        <MainAdminDashboard />
      </div>
      <Footer />
    </div>
  ) : <div>401 Unauthorized</div>
};

export default AdminDashboard;
