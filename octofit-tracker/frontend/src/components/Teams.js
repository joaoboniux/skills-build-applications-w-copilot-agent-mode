import React, { useCallback, useEffect, useState } from 'react';

const renderValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  const loadTeams = useCallback(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams payload:', data);
        const results = data.results || data;
        setTeams(results);
      })
      .catch((err) => console.error('Error fetching teams:', err));
  }, [endpoint]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const filteredTeams = teams.filter((team) =>
    JSON.stringify(team).toLowerCase().includes(search.toLowerCase())
  );

  const headers = filteredTeams.length ? Object.keys(filteredTeams[0]) : [];

  const openModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="card-title mb-1">Teams</h2>
            <p className="text-muted mb-0">Explore team entries and get quick access to each team’s details.</p>
          </div>
          <button type="button" className="btn btn-outline-primary mt-3 mt-md-0" onClick={loadTeams}>
            Refresh Teams
          </button>
        </div>

        <form className="row g-3 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm-8">
            <label htmlFor="team-search" className="form-label">Search teams</label>
            <input
              id="team-search"
              type="search"
              className="form-control"
              placeholder="Filter by team name or id"
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
              {filteredTeams.map((team, idx) => (
                <tr key={team.id || idx}>
                  {headers.map((header) => (
                    <td key={header}>{renderValue(team[header])}</td>
                  ))}
                  <td className="text-end">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(team)}>
                      View details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan={headers.length + 1} className="text-center text-muted-empty py-4">
                    No teams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedTeam && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Details</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedTeam, null, 2)}</pre>
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

export default Teams;
