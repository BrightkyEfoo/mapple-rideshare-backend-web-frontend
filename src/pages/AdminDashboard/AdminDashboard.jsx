import React from 'react';
import './style.css'
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import MainAdminDashboard from '../../Components/AdminDashboard/MainAdminDashboard';
import AdminSideBar from '../../Components/AdminDashboard/AdminSideBar';
import Error from '../../Components/401';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer '+localStorage.getItem('token')
  // console.log('user', user)
  // useEffect
  // if(user.acceessLevel <= 2 || !user.acceessLevel)
  return user && user.isValidated && user.accessLevel >2? (
    <div>
      <NavBar />
      <div className='dashboard-super-container'>
        <AdminSideBar />
        <MainAdminDashboard />
      </div>
      <Footer />
    </div>
  ) : <div>
    <NavBar />
    <Error text={'Unauthorized'} code={401} />
    <Footer />
  </div>
};

export default AdminDashboard;
