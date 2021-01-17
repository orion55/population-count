import React from 'react';
import './App.css';
import { ToastProvider } from 'react-toast-notifications';
import BasicMap from '../components/BasicMap';

function App() {
  return (
    <ToastProvider>
      <BasicMap />
    </ToastProvider>
  );
}

export default App;
