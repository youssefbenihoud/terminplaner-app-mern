import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Navbar from './components/Navbar.js';
import Dashboard from './pages/Dashboard'; // Wird später erstellt

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;