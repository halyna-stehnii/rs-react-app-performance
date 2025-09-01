import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC = React.memo(() => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Fetching CO2 data from Our World in Data...</p>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default React.memo(LoadingSpinner);
