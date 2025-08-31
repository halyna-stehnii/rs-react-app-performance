import { Suspense } from 'react';
import Table from './components/Table/Table';
import { ColumnModal } from './components/ColumnModal/ColumnModal';
import { YearSelector } from './components/YearSelector/YearSelector';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useCO2Countries } from './hooks/useCO2Data';
import { useColumnSelection } from './hooks/useColumnSelection';
import { useYearSelection } from './hooks/useYearSelection';
import { useCountrySearch } from './hooks/useCountrySearch';
import { useSorting } from './hooks/useSorting';
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

  const { searchTerm, filteredCountries, handleSearchChange } =
    useCountrySearch(countries);

  const { sortedCountries, sortConfig, handleSort } =
    useSorting(filteredCountries);

  return (
    <div className="table-container-wrapper">
      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <div className="table-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <button
          onClick={handleOpenModal}
          className="column-selector-button"
          type="button"
        >
          Customize Columns
        </button>
      </div>

      <Table
        countries={sortedCountries}
        visibleColumns={visibleColumns}
        searchTerm={searchTerm}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

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
