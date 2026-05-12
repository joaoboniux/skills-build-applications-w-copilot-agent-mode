import React, { useCallback, useEffect, useState } from 'react';

const renderValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const codespaceName = window.location.hostname.split('-3000')[0];
  const protocol = window.location.protocol;
  const backendUrl = `${protocol}//${codespaceName}-8000.app.github.dev`;
  const endpoint = `${backendUrl}/api/leaderboard/`;

  const loadLeaderboard = useCallback(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setLeaders(results);
      })
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const filteredLeaders = leaders.filter((leader) =>
    JSON.stringify(leader).toLowerCase().includes(search.toLowerCase())
  );

  const headers = filteredLeaders.length ? Object.keys(filteredLeaders[0]) : [];

  const openModal = (leader) => {
    setSelectedLeader(leader);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLeader(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="card-title mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">Review top performers and compare leaderboard metrics in a unified table layout.</p>
          </div>
          <button type="button" className="btn btn-outline-primary mt-3 mt-md-0" onClick={loadLeaderboard}>
            Refresh Leaderboard
          </button>
        </div>

        <form className="row g-3 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm-8">
            <label htmlFor="leaderboard-search" className="form-label">Search leaderboard</label>
            <input
              id="leaderboard-search"
              type="search"
              className="form-control"
              placeholder="Search by name, rank, or score"
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
              {filteredLeaders.map((leader, idx) => (
                <tr key={leader.id || idx}>
                  {headers.map((header) => (
                    <td key={header}>{renderValue(leader[header])}</td>
                  ))}
                  <td className="text-end">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(leader)}>
                      View details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeaders.length === 0 && (
                <tr>
                  <td colSpan={headers.length + 1} className="text-center text-muted-empty py-4">
                    No leaderboard entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedLeader && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Entry</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedLeader, null, 2)}</pre>
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

export default Leaderboard;
