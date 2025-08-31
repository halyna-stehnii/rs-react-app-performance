import { Suspense } from 'react';
import Table from './components/Table/Table';
import { ColumnModal } from './components/ColumnModal/ColumnModal';
import { YearSelector } from './components/YearSelector/YearSelector';
import { useCO2Countries } from './hooks/useCO2Data';
import { useColumnSelection } from './hooks/useColumnSelection';
import { useYearSelection } from './hooks/useYearSelection';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ErrorFallback } from './components/ErrorFallBack/ErrorFallback';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import './App.css';

const CountriesTableContainer = () => {
  const {
    visibleColumns,
    isModalOpen,
    availableAdditionalColumns,
    handleColumnsChange,
    handleOpenModal,
    handleCloseModal,
  } = useColumnSelection();

  const { selectedYear, handleYearChange } = useYearSelection();

  const countries = useCO2Countries(selectedYear);

  return (
    <div className="table-container-wrapper">
      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <div className="table-controls">
        <button
          onClick={handleOpenModal}
          className="column-selector-button"
          type="button"
        >
          Customize Columns
        </button>
      </div>

      <Table countries={countries} visibleColumns={visibleColumns} />

      <ColumnModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        availableColumns={availableAdditionalColumns}
        selectedColumns={visibleColumns}
        onColumnsChange={handleColumnsChange}
      />
    </div>
  );
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
