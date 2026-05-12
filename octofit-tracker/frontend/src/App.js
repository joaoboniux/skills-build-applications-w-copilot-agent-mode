
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 app-navbar">
          <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img src="/octofitapp-small.svg" alt="Octofit logo" className="app-logo-sm me-2" />
            <span>Octofit Tracker</span>
          </Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="/"
            element={
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="card-title mb-3">Welcome to Octofit Tracker</h2>
                  <p className="card-text text-secondary">
                    Choose a section from the navigation menu to review activities, teams, users, workouts, and leaderboard data.
                  </p>
                  <Link className="btn btn-outline-primary" to="/activities">
                    Browse Activities
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
