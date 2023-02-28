import React, { useState } from 'react';
import './style.css';
import { AiOutlineDashboard, AiOutlinePoweroff } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdBusinessCenter, MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { FaShoppingCart, FaUpload } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavBarActions } from '../../rtk/features/NavBarSlice';

const SideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = e =>{
    navigate('/')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  return (
    <div className="dashboard-side-bar">
      <div
        className="dashboard-side-bar-button-container"
        onClick={e => console.log('first', { element: e.target })}
      >
        <AiOutlineDashboard size={20} />
        <p>Dashboard</p>
        <div className="dashboard-side-bar-triangle"></div>
      </div>
      <div
        className="dashboard-side-bar-button-container"
        onClick={e => dispatch(NavBarActions.setSelected(1))}
      >
        <MdBusinessCenter size={20} />
        <p>Events</p>
        <div className="dashboard-side-bar-triangle"></div>
      </div>
      <div
        className="dashboard-side-bar-button-container"
        onClick={e =>  dispatch(NavBarActions.setSelected(2))}
      >
        <FaShoppingCart size={20} />
        <p>Activities</p>
        <div className="dashboard-side-bar-triangle"></div>
      </div>
      <div
        className="dashboard-side-bar-button-container"
        onClick={e => console.log('first', { element: e.target })}
      >
        <FaUpload size={20} />
        <p>Opportunities</p>
        <div className="dashboard-side-bar-triangle"></div>
      </div>
      <div
        className="dashboard-side-bar-button-container"
        onClick={e => dispatch(NavBarActions.setSelected(4))}
      >
        <IoMdSettings size={20} />
        <p>Settings</p>
        <MdKeyboardArrowRight />
        <div className="dashboard-side-bar-triangle"></div>
      </div>
      <div className="dashboard-side-bar-button-bottom-container">
        <div className="dashboard-side-bar-button-bottom-icon" onClick={handleLogOut}><HiOutlineLogout size={20} /></div>
        <div className="dashboard-side-bar-button-bottom-icon" onClick={e => dispatch(NavBarActions.setSelected(6))} ><BsFillPersonFill size={20} /></div>
        <div className="dashboard-side-bar-button-bottom-icon" ><AiOutlinePoweroff size={20} /></div>
      </div>
    </div>
  );
};

export default SideBar;
