import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';
import RiderLoginFormContainer from './Components/RiderLoginForm/RiderLoginFormContainer';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserCreateForm from './Components/UserCreateForm/UserCreateForm';
import BookRide from './pages/BookRide/BookRide';
import AboutPage from './pages/About/AboutPage';

function App() {
  const isVisibleRiderLoginForm = useSelector(
    state => state.RiderLoginForm.isVisible
  );
  const isVisibleUserCreateOrEdit = useSelector(state => state.UserCreateOrEdit.isVisible)
  return (
    <div className="App">
      <Router>
        {isVisibleRiderLoginForm && <RiderLoginFormContainer />}
        {isVisibleUserCreateOrEdit && <UserCreateForm />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<SingleEventPage />} />
          <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maple-ride-admin" element={<AdminLogin />} />
          <Route path="/maple-ride-admin/dashboard" element={<AdminDashboard />} />
          <Route path="/book-ride" element={<BookRide />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
