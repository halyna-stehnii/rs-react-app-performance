import React from 'react';
import './ErrorFallback.css';

interface ErrorFallbackProps {
  error: Error;
  onRetry?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  onRetry = () => window.location.reload(),
}) => {
  const isNetworkError =
    error.message.includes('fetch') ||
    error.message.includes('network') ||
    error.message.includes('HTTP error');

  return (
    <div className="error-fallback-container">
      <h2 className="error-fallback-title">
        {isNetworkError ? 'Connection Error' : 'Failed to Load Data'}
      </h2>
      <p className="error-fallback-message">
        {isNetworkError ? (
          <>
            Unable to fetch CO2 data from Our World in Data. Please check your
            internet connection and try again.
          </>
        ) : (
          error.message
        )}
      </p>
      {isNetworkError && (
        <p className="error-fallback-source">
          Data source: Our World in Data CO2 Emissions Dataset
        </p>
      )}
      <button className="error-fallback-button" onClick={onRetry}>
        {isNetworkError ? 'Retry Connection' : 'Try Again'}
      </button>
    </div>
  );
};

export default ErrorFallback;
