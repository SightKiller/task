import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutinFile from './RoutinFile';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <RoutinFile />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
