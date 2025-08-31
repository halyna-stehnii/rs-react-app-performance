import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Fetching CO2 data from Our World in Data...</p>
  </div>
);

export default LoadingSpinner;
