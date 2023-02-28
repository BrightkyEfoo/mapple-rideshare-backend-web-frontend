import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';
import RiderLoginFormContainer from './Components/RiderLoginForm/RiderLoginFormContainer';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const isVisibleRiderLoginForm = useSelector(
    state => state.RiderLoginForm.isVisible
  );
  return (
    <div className="App">
      <Router>
        {isVisibleRiderLoginForm && <RiderLoginFormContainer />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<SingleEventPage />} />
          <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
