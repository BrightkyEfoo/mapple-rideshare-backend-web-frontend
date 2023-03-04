import React, { useState } from 'react';
import './style.css';
import { AiOutlineDashboard, AiOutlinePoweroff } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import { BsFillPersonFill, BsGraphUp } from 'react-icons/bs';
import { MdBusinessCenter, MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { FaShoppingCart, FaUpload } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavBarActions } from '../../rtk/features/NavBarSlice';

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NavBarState = useSelector(state => state.NavBar);
  const handleLogOut = e => {
    navigate('/');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  return (
    <div className="dashboard-side-bar">
      <div className="dashboard-side-bar-title-container">
        <AiOutlineDashboard size={20} />
        <p>Dashboard</p>
      </div>
      <div
        className={NavBarState.selected === 1 ? 'dashboard-side-bar-button-container selected' : 'dashboard-side-bar-button-container'}
        onClick={e => dispatch(NavBarActions.setSelected(1))}
      >
        <FaShoppingCart size={20} />
        <p>Order History</p>
        {NavBarState.selected === 1 && <div className="dashboard-side-bar-triangle"></div>}
      </div>
      <div
        className="dashboard-side-bar-button-container disabled"
        // onClick={e => dispatch(NavBarActions.setSelected(1))}
      >
        <BsGraphUp size={20} />
        <p>Booking</p>
        {NavBarState.selected === 2 && <div className="dashboard-side-bar-triangle"></div>}
      </div>

      <div
        className={NavBarState.selected === 2 ? 'dashboard-side-bar-button-container selected' : 'dashboard-side-bar-button-container'}
        onClick={e => console.log('first', { element: e.target })}
      >
        <GiMoneyStack size={20} />
        <p>Payment</p>
        {NavBarState.selected === 8 && <div className="dashboard-side-bar-triangle"></div>}
      </div>
      <div
        className={NavBarState.selected === 4 ? 'dashboard-side-bar-button-container selected' : 'dashboard-side-bar-button-container'}
        onClick={e => dispatch(NavBarActions.setSelected(4))}
      >
        <IoMdSettings size={20} />
        <p>Settings</p>
        <MdKeyboardArrowRight />
        {NavBarState.selected === 4 && <div className="dashboard-side-bar-triangle"></div>}
      </div>
      <div className="dashboard-side-bar-button-bottom-container">
        <div className="dashboard-side-bar-button-bottom-icon" onClick={handleLogOut}>
          <HiOutlineLogout size={20} />
        </div>
        <div
          className={
            NavBarState.selected === 6 ? 'dashboard-side-bar-button-bottom-icon selected' : 'dashboard-side-bar-button-bottom-icon'
          }
          onClick={e => dispatch(NavBarActions.setSelected(6))}
        >
          <BsFillPersonFill size={20} />
        </div>
        <div className="dashboard-side-bar-button-bottom-icon">
          <AiOutlinePoweroff size={20} />
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
