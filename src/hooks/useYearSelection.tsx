import { useState } from 'react';

export const useYearSelection = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );

  const handleYearChange = (year: number | undefined) => {
    setSelectedYear(year);
  };

  return {
    selectedYear,
    handleYearChange,
  };
};
