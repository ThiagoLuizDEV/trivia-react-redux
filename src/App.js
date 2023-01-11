import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <switch>
        <Route exact path="/" component={ Login } />
      </switch>
    </div>
  );
}
