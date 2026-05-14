import React, { useCallback, useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

const renderValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const endpoint = `${getApiBaseUrl()}/api/users/`;

  const loadUsers = useCallback(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setUsers(results);
      })
      .catch((err) => console.error('Error fetching users:', err));
  }, [endpoint]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = users.filter((user) =>
    JSON.stringify(user).toLowerCase().includes(search.toLowerCase())
  );

  const headers = filteredUsers.length ? Object.keys(filteredUsers[0]) : [];

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h2 className="card-title mb-1">Users</h2>
            <p className="text-muted mb-0">Search and inspect user accounts with a polished Bootstrap layout.</p>
          </div>
          <button type="button" className="btn btn-outline-primary mt-3 mt-md-0" onClick={loadUsers}>
            Refresh Users
          </button>
        </div>

        <form className="row g-3 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm-8">
            <label htmlFor="user-search" className="form-label">Search users</label>
            <input
              id="user-search"
              type="search"
              className="form-control"
              placeholder="Filter by username, email, or id"
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
              {filteredUsers.map((user, idx) => (
                <tr key={user.id || idx}>
                  {headers.map((header) => (
                    <td key={header}>{renderValue(user[header])}</td>
                  ))}
                  <td className="text-end">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => openModal(user)}>
                      View details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={headers.length + 1} className="text-center text-muted-empty py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedUser, null, 2)}</pre>
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

export default Users;
