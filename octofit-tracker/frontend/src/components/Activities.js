import React, { useCallback, useEffect, useState } from 'react';

const renderValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  const loadActivities = useCallback(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities payload:', data);
        const results = data.results || data;
        setActivities(results);
      })
      .catch((err) => console.error('Error fetching activities:', err));
  }, [endpoint]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const filteredActivities = activities.filter((activity) =>
    JSON.stringify(activity).toLowerCase().includes(search.toLowerCase())
  );

  const headers = filteredActivities.length
    ? Object.keys(filteredActivities[0])
    : [];

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="card-title mb-1">Activities</h2>
            <p className="text-muted mb-0">Browse activity entries and inspect details in a consistent dashboard layout.</p>
          </div>
          <button type="button" className="btn btn-outline-primary mt-3 mt-md-0" onClick={loadActivities}>
            Refresh Activities
          </button>
        </div>

        <form className="row g-3 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm-8">
            <label htmlFor="activity-search" className="form-label">Search activities</label>
            <input
              id="activity-search"
              type="search"
              className="form-control"
              placeholder="Filter by name, type, or id"
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
              {filteredActivities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  {headers.map((header) => (
                    <td key={header}>{renderValue(activity[header])}</td>
                  ))}
                  <td className="text-end">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(activity)}>
                      View details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan={headers.length + 1} className="text-center text-muted-empty py-4">
                    No activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedActivity && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedActivity, null, 2)}</pre>
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

export default Activities;
