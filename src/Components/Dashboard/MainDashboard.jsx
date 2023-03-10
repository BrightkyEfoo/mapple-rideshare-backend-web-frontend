import React from 'react'
import { useSelector } from 'react-redux';
import UserDetailsView from './UserDetailsView';
import OrderHistoryView from './OrderHistoryView';

const MainDashboard = () => {
  const NavBarState = useSelector(state => state.NavBar);
  switch (NavBarState.selected) {
    case 1:
      return <OrderHistoryView />
    // case 2:
    //   return <ActivityView />;
    // case 4:
    //   return <SettingsView />;
    case 6:
      return <UserDetailsView />;
    default:
      return  <OrderHistoryView />;
  }
}

export default MainDashboard