import { useState, useEffect } from 'react';
import api from '../api/axios';

const UserSearchInput = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length < 2) return;
      
      setIsLoading(true);
      try {
        const response = await api.get(`/users/search?query=${searchTerm}`);
        setResults(response.data);
      } catch (error) {
        console.error('Suche fehlgeschlagen:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="user-search">
      <input
        type="text"
        placeholder="Benutzer suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {isLoading && <div className="dropdown-item">Lädt...</div>}
      
      {results.length > 0 && (
        <div className="search-dropdown">
          {results.map(user => (
            <div
              key={user._id}
              className="dropdown-item"
              onClick={() => {
                onChange(user.username);
                setSearchTerm('');
                setResults([]);
              }}
            >
              {user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearchInput;