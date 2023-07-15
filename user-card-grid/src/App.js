import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    setLoading(true);

    setTimeout(() => {
      axios
        .get(' https://reqres.in/api/users?page=1')
        .then(response => {
          setLoading(false);
          if (response.data && response.data.data && response.data.data.length > 0) {
            setUsers(response.data.data);
          }
        })
        .catch(error => {
          setLoading(false);
          console.error(error);
        });
    }, 5000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="brand">LGMVIP-Users</h1>
        <button className={loading ? 'btn btn-disabled' : 'btn blink-animation'} onClick={getUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Get Users'}
        </button>
      </header>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="user-avatar" />
            <h2 className="user-name">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
