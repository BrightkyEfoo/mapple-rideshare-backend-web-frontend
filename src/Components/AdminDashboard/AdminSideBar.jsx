import React, { useState } from 'react';
import './style.css';
import { AiOutlineDashboard, AiOutlinePoweroff } from 'react-icons/ai';
import { HiOutlineLogout, HiUsers } from 'react-icons/hi';
import { BsFillPersonFill, BsGraphUp } from 'react-icons/bs';
import { MdBusinessCenter, MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { FaShoppingCart, FaUpload } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavBarActions } from '../../rtk/features/NavBarSlice';
import { RiderLoginFormActions } from '../../rtk/features/RiderLoginFormSlice';

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const NavBarState = useSelector(state => state.NavBar);
  const [hovered, setHovered] = useState(null);
  const handleLogOut = e => {
    if (user && user.id) {
      if (user.accessLevel === 3) {
        navigate('/Board_@MRS0223');
      } else {
        navigate('/Dash_MRS0223');
      }
    } else {
      navigate('/');
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // setTimeout(() => {
    //   dispatch(RiderLoginFormActions.setIsVisible(true));
    // }, 250);
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
        className="dashboard-side-bar-button-container"
        // onClick={e => dispatch(NavBarActions.setSelected(1))}
      >
        <BsGraphUp size={20} />
        <p>Booking</p>
        {NavBarState.selected === 2 && <div className="dashboard-side-bar-triangle"></div>}
      </div>

      <div
        className={NavBarState.selected === 3 ? 'dashboard-side-bar-button-container selected' : 'dashboard-side-bar-button-container'}
        onClick={e => dispatch(NavBarActions.setSelected(3))}
      >
        <GiMoneyStack size={20} />
        <p>Cash</p>
        {NavBarState.selected === 3 && <div className="dashboard-side-bar-triangle"></div>}
      </div>
      <div
        className={NavBarState.selected === 4 ? 'dashboard-side-bar-button-container selected' : 'dashboard-side-bar-button-container'}
        onClick={e => dispatch(NavBarActions.setSelected(4))}
      >
        <HiUsers size={20} />
        <p>Users</p>
        {NavBarState.selected === 4 && <div className="dashboard-side-bar-triangle"></div>}
      </div>
      <div
        className={NavBarState.selected === 5 ? 'dashboard-side-bar-button-container selected' : 'dashboard-side-bar-button-container'}
        // onClick={e => dispatch(NavBarActions.setSelected(4))}
      >
        <IoMdSettings size={20} />
        <p>Settings</p>
        <MdKeyboardArrowRight />
        {NavBarState.selected === 5 && <div className="dashboard-side-bar-triangle"></div>}
      </div>
      <div className="dashboard-side-bar-button-bottom-container">
        <div
          className="dashboard-side-bar-button-bottom-icon"
          onClick={e => {
            navigate('/');
          }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
        >
          <HiOutlineLogout size={20} />
          {hovered === 0 && (
            <div>
              <p>home page</p>
            </div>
          )}
        </div>
        <div
          className={
            NavBarState.selected === 6 ? 'dashboard-side-bar-button-bottom-icon selected' : 'dashboard-side-bar-button-bottom-icon'
          }
          onClick={e => dispatch(NavBarActions.setSelected(6))}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          <BsFillPersonFill size={20} />
          {hovered === 1 && (
            <div>
              <p>edit profile</p>
            </div>
          )}
        </div>
        <div
          className="dashboard-side-bar-button-bottom-icon"
          onClick={handleLogOut}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        >
          <AiOutlinePoweroff size={20} />
          {hovered === 2 && (
            <div>
              <p>log out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
