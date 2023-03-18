import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import SideBar from './SideBar';
import './style.css';
import { BsFillMenuButtonFill } from 'react-icons/bs';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

const MobileSideBar = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <div className="dashboard-mobile-side-bar">
      <div>
        <button onClick={() => setIsDisplayed(!isDisplayed)}>
          {isDisplayed ? <RxCross1 size={25} /> : <BsFillMenuButtonFill size={25} />}
        </button>
        <div className="mobile-dashboard-side-bar-title-container">
          {/* <AiOutlineDashboard size={40} /> */}
          <p>Dashboard</p>
        </div>
      </div>
      {isDisplayed && (
        <div>
          <SideBar collapseMenu={() => setIsDisplayed(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileSideBar;
