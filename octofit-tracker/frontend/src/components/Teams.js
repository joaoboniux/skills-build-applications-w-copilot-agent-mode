import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/teams/');
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        const teamsList = Array.isArray(data) ? data : data.results || [];
        setTeams(teamsList);
        console.log('Teams fetched:', teamsList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>🏆 Teams</h2>
      {teams.length === 0 ? (
        <div className="alert alert-warning">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="card-footer bg-light">
                    <small className="text-muted">
                      Created by: <strong>{team.created_by?.name}</strong>
                    </small>
                    <br />
                    <small className="text-muted">
                      Members: <strong>{team.members?.length || 0}</strong>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
