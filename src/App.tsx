import { Suspense } from 'react';
import { Table } from './components/Table/Table';
import { useCO2Countries } from './hooks/useCO2Data';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ErrorFallback } from './components/ErrorFallBack/ErrorFallback';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import './App.css';

const CountriesTableContainer = () => {
  const countries = useCO2Countries();
  return <Table countries={countries} />;
};

function App() {
  return (
    <div className="app">
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <Suspense fallback={<LoadingSpinner />}>
          <CountriesTableContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
