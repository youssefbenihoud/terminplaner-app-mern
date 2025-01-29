import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../features/authSlice'; // Wird später implementiert

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup({ username, password })).unwrap()
      .then(() => navigate('/login'))
      .catch(err => console.error(err));
  };

  return (
    <div className="register-container">
      <h2>Registrieren</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Wird registriert...' : 'Account erstellen'}
        </button>
      </form>
    </div>
  );
};

export default Register;