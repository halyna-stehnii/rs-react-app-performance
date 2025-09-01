import { useState, useCallback } from 'react';

export const useYearSelection = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );

  const handleYearChange = useCallback((year: number | undefined) => {
    setSelectedYear(year);
  }, []);

  return {
    selectedYear,
    handleYearChange,
  };
};
