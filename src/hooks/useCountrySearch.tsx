import { useState, useMemo } from 'react';
import type { ProcessedCountry } from '../types/types';

export const useCountrySearch = (countries: ProcessedCountry[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) {
      return countries;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    return countries.filter((country) => {
      return country.name?.toLowerCase().includes(normalizedSearchTerm);
    });
  }, [countries, searchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    filteredCountries,
    handleSearchChange,
    clearSearch,
  };
};
