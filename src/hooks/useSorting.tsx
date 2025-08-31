import { useState, useMemo } from 'react';
import type { ProcessedCountry } from '../types/types';

export type SortField = 'name' | 'population' | 'none';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export const useSorting = (countries: ProcessedCountry[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'none',
    direction: 'asc',
  });

  const sortedCountries = useMemo(() => {
    if (sortConfig.field === 'none') {
      return countries;
    }

    return [...countries].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortConfig.field === 'name') {
        aValue = a.name?.toLowerCase() || '';
        bValue = b.name?.toLowerCase() || '';
      } else if (sortConfig.field === 'population') {
        aValue = a.population || 0;
        bValue = b.population || 0;
      } else {
        return 0;
      }

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
    });
  }, [countries, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.field === field) {
        if (prevConfig.direction === 'asc') {
          return { field, direction: 'desc' };
        } else {
          return { field: 'none', direction: 'asc' };
        }
      } else {
        return { field, direction: 'asc' };
      }
    });
  };

  const resetSort = () => {
    setSortConfig({ field: 'none', direction: 'asc' });
  };

  return {
    sortedCountries,
    sortConfig,
    handleSort,
    resetSort,
  };
};
