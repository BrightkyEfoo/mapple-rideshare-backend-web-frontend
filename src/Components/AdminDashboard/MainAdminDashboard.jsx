import React from 'react';
import { useSelector } from 'react-redux';
import AdminDetailsView from './AdminDetailsView';
import AdminSettingsView from './AdminSettingsView';
import AdminOrderHistory from './AdminOrderHistory';
import NotificationsView from '../Dashboard/NotificationsView';
import AdminCashView from './AdminCashView';
const MainAdminDashboard = () => {
  const NavBarState = useSelector(state => state.NavBar);
  switch (NavBarState.selected) {
    case 1:
      return <AdminOrderHistory />;
    case 3:
      return <AdminCashView />;
    case 4:
      return <AdminSettingsView />;
    case 6:
      return <AdminDetailsView />;
    case 7:
      return <NotificationsView />;
    default:
      return <AdminOrderHistory />;
  }
};

export default MainAdminDashboard;
