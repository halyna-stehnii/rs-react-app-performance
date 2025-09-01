import React from 'react';
import type { SortField, SortConfig } from '../../hooks/useSorting';
import './SortControls.css';

interface SortControlsProps {
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  onReset: () => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortConfig,
  onSort,
  onReset,
}) => {
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return '↕️'; // Unsorted
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const getSortButtonClass = (field: SortField) => {
    const baseClass = 'sort-button';
    if (sortConfig.field === field) {
      return `${baseClass} sort-button-active`;
    }
    return baseClass;
  };

  return (
    <div className="sort-controls">
      <div className="sort-buttons">
        <button
          onClick={() => onSort('name')}
          className={getSortButtonClass('name')}
          type="button"
          title="Sort by country name"
        >
          Name {getSortIcon('name')}
        </button>

        <button
          onClick={() => onSort('population')}
          className={getSortButtonClass('population')}
          type="button"
          title="Sort by population"
        >
          Population {getSortIcon('population')}
        </button>

        {sortConfig.field !== 'none' && (
          <button
            onClick={onReset}
            className="sort-reset-button"
            type="button"
            title="Clear sorting"
          >
            Clear Sort
          </button>
        )}
      </div>

      {sortConfig.field !== 'none' && (
        <div className="sort-status">
          Sorted by{' '}
          <strong>{sortConfig.field === 'name' ? 'Name' : 'Population'}</strong>{' '}
          ({sortConfig.direction === 'asc' ? 'Ascending' : 'Descending'})
        </div>
      )}
    </div>
  );
};

export default SortControls;
