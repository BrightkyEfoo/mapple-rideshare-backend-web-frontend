import React from 'react'
import AdminLoginForm from '../../Components/AdminLoginForm/AdminLoginForm'
import './style.css'
const AdminLogin = ({type}) => {
    
  return (
    <div className='admin-login-container'>
        <AdminLoginForm type={type} />
    </div>
  )
}

export default AdminLogin