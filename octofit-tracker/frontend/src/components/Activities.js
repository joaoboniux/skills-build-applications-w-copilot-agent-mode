import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/activities/');
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        const activitiesList = Array.isArray(data) ? data : data.results || [];
        setActivities(activitiesList);
        console.log('Activities fetched:', activitiesList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const getActivityIcon = (type) => {
    const icons = {
      running: '🏃',
      walking: '🚶',
      strength: '💪',
      cycling: '🚴',
      swimming: '🏊',
      yoga: '🧘',
    };
    return icons[type] || '🏋️';
  };

  return (
    <div>
      <h2>💪 Activities</h2>
      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span>{getActivityIcon(activity.activity_type)} {activity.activity_type}</span>
                  </td>
                  <td><strong>{activity.user?.name}</strong></td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance || 'N/A'}</td>
                  <td>{activity.calories_burned || 'N/A'}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
