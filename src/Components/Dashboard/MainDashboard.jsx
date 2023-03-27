import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserDetailsView from './UserDetailsView';
import OrderHistoryView from './OrderHistoryView';
import BookRiderHistoryDriver from './BookRiderHistoryDriver';
import NotificationsView from './NotificationsView';
import WithdrawView from './WithdrawView';
import { NavBarActions } from '../../rtk/features/NavBarSlice';

const MainDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const NavBarState = useSelector(state => state.NavBar);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.accessLevel === 1) {
      dispatch(NavBarActions.setSelected(2));
    }
  }, []);

  switch (NavBarState.selected) {
    case 1:
      return <OrderHistoryView />;
    case 2:
      return <BookRiderHistoryDriver />;
    case 3:
      return <WithdrawView />;
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
