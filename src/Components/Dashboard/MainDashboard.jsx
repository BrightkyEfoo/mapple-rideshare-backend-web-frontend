import React from 'react';
import { useSelector } from 'react-redux';
import UserDetailsView from './UserDetailsView';
import OrderHistoryView from './OrderHistoryView';
import BookRiderHistoryDriver from './BookRiderHistoryDriver';
import NotificationsView from './NotificationsView';

const MainDashboard = () => {
  const NavBarState = useSelector(state => state.NavBar);
  switch (NavBarState.selected) {
    case 1:
      return <OrderHistoryView />;
    case 2:
      return <BookRiderHistoryDriver />;
    // case 4:
    //   return <SettingsView />;
    case 6:
      return <UserDetailsView />;
    case 7:
      return <NotificationsView />;
    default:
      return <OrderHistoryView />;
  }
};

export default MainDashboard;
