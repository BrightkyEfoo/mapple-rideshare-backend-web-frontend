import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    state => state.Notification.isRateVisible
  );
  const dispatch = useDispatch();

  socket.on('new-booking', data => {
    console.log('data new-booking socket', data);
    dispatch(NotificationActions.setNotifications(data.notifications));

    dispatch(NotificationActions.setContent('A new ride for you'));
    dispatch(NotificationActions.setIsVisible(true));
  });

  socket.on('validated', data => {
    console.log('data validated socket', data);
    dispatch(NotificationActions.setNotifications(data.notifications));

    dispatch(
      NotificationActions.setContent(
        'your booking has been validated by the driver, He will be there after 10min'
      )
    );
    dispatch(NotificationActions.setIsVisible(true));
  });
  socket.on('started', data => {
    dispatch(NotificationActions.setNotifications(data.notifications));
    dispatch(
      NotificationActions.setContent('your booking has been started now!')
    );
    dispatch(NotificationActions.setIsVisible(true));
  });

  socket.on('confirmed', data => {
    if (data.state === 2) {
      dispatch(
        NotificationActions.setContent(
          'Your driver has confirmed that the ride had been ended. do you confirm ?'
        )
      );
      dispatch(NotificationActions.setNotifications(data.notifications));
      dispatch(
        NotificationActions.setActions([
          {
            id: 1,
            content: 'Yes',
            handle: () => {
              axios
                .post(
                  'http://localhost:9001/map/booking/confirm',
                  {
                    userId: user.id,
                    bookingId: data.booking.id,
                  },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                )
                .then(res => {
                  dispatch(NotificationActions.setIsRateVisible(true))
                  console.log('res.data', res.data);
                })
                .catch(err => {
                  console.log('err', err);
                });
            },
          },
          {
            id: 2,
            content: 'No',
            handle: () => {
              dispatch(NotificationActions.setIsVisible(false));
            },
          },
        ])
      );
    } else if (data.state === 3) {
      dispatch(NotificationActions.setContent('Your ride is at end'));
    }
    dispatch(NotificationActions.setIsVisible(true));
  });

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

  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
