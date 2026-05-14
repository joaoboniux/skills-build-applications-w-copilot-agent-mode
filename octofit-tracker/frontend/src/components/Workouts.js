import React, { useCallback, useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

const renderValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const endpoint = `${getApiBaseUrl()}/api/workouts/`;

  const loadWorkouts = useCallback(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setWorkouts(results);
      })
      .catch((err) => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  const filteredWorkouts = workouts.filter((workout) =>
    JSON.stringify(workout).toLowerCase().includes(search.toLowerCase())
  );

  const headers = filteredWorkouts.length ? Object.keys(filteredWorkouts[0]) : [];

  const openModal = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="card-title mb-1">Workouts</h2>
            <p className="text-muted mb-0">Track workout sessions and review workout metadata in a polished interface.</p>
          </div>
          <button type="button" className="btn btn-outline-primary mt-3 mt-md-0" onClick={loadWorkouts}>
            Refresh Workouts
          </button>
        </div>

        <form className="row g-3 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm-8">
            <label htmlFor="workout-search" className="form-label">Search workouts</label>
            <input
              id="workout-search"
              type="search"
              className="form-control"
              placeholder="Filter by workout name or id"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-sm-4 d-flex align-items-end justify-content-sm-end">
            <button type="button" className="btn btn-secondary" onClick={() => setSearch('')}>
              Clear Filter
            </button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header.replace('_', ' ').toUpperCase()}</th>
                ))}
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  {headers.map((header) => (
                    <td key={header}>{renderValue(workout[header])}</td>
                  ))}
                  <td className="text-end">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(workout)}>
                      View details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredWorkouts.length === 0 && (
                <tr>
                  <td colSpan={headers.length + 1} className="text-center text-muted-empty py-4">
                    No workouts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedWorkout && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workout Details</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedWorkout, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
