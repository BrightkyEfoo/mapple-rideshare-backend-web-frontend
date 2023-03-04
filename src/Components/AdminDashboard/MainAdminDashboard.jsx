import React from 'react'
import { useSelector } from 'react-redux';
import AdminDetailsView from './AdminDetailsView';
import AdminSettingsView from './AdminSettingsView';
const MainAdminDashboard = () => {
  const NavBarState = useSelector(state => state.NavBar);
  switch (NavBarState.selected) {
    // case 1:
    //   return <;
    // case 2:
    //   return <ActivityView />;
    case 4:
      return <AdminSettingsView />;
    case 6:
      return <AdminDetailsView />;
    default:
      return <div>  Chose something</div>;
  }
}

export default MainAdminDashboard