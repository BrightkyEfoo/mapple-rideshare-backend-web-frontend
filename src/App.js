import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import RiderLoginFormContainer from './Components/RiderLoginForm/RiderLoginFormContainer';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserCreateForm from './Components/UserCreateForm/UserCreateForm';
import BookRide from './pages/BookRide/BookRide';
import AboutPage from './pages/About/AboutPage';
import SmallPayment from './Components/SmallPayment/SmallPayment';
import { socket } from './Socket';
import { useEffect } from 'react';
import SmallNotif from './Components/notification/SmallNotif';
import { NotificationActions } from './rtk/features/Notificarion';
import axios from 'axios';
import MessageRatePopUp from './Components/RatePopup/MessageRatePopUp';
import { NavBarActions } from './rtk/features/NavBarSlice';

function App() {
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isVisibleRiderLoginForm = useSelector(
    state => state.RiderLoginForm.isVisible
  );
  const isVisibleUserCreateOrEdit = useSelector(
    state => state.UserCreateOrEdit.isVisible
  );
  const isPaymentDisplay = useSelector(
    state => state.BookRide.isPaymentDisplay
  );
  const isSmallNotifVisible = useSelector(
    state => state.Notification.isVisible
  );
  const isSmallRateVisible = useSelector(
    state => state.Notification.Rate.isVisible
  );
  const notifications = useSelector(state => state.Notification.contents);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.connect();
    if (user) {
      socket.emit('login', { userId: user.id });
    }
    return () => {
      if (user) {
        socket.emit('logout', { userId: user.id });
      }

      socket.disconnect();
    };
  }, []);

  socket.on('notification', data => {
    console.log('socket', data);
    // dispatch(NavBarActions.reload());
    if (data.route) {
      navigate(data.route);
    }
    if (data.pop_up?.display) {
      // dispatch(NotificationActions.clear());
      dispatch(NotificationActions.addContent({ ...data.pop_up }));
      dispatch(NotificationActions.setIsVisible(true));
    }
    if (data.notification) {
      dispatch(NotificationActions.addNotification(data.notification));
    }
  });

  return (
    <div className="App">
      {/* <Router> */}
      {isPaymentDisplay && <SmallPayment />}
      {isVisibleRiderLoginForm && <RiderLoginFormContainer />}
      {isVisibleUserCreateOrEdit && <UserCreateForm />}
      {isSmallNotifVisible && <SmallNotif />}
      {isSmallRateVisible && <MessageRatePopUp />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<SingleEventPage />} />
          <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maple-ride-admin" element={<AdminLogin />} />
        <Route
          path="/maple-ride-admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route path="/book-ride" element={<BookRide />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
