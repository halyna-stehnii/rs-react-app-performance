import React from 'react';
import { useAvailableYears } from '../../hooks/useCO2Data';
import './YearSelector.css';

interface YearSelectorProps {
  selectedYear: number | undefined;
  onYearChange: (year: number | undefined) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onYearChange,
}) => {
  const availableYears = useAvailableYears();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const year = value === 'latest' ? undefined : parseInt(value, 10);
    onYearChange(year);
  };

  return (
    <div className="year-selector">
      <label htmlFor="year-select" className="year-selector-label">
        Select Year:
      </label>
      <select
        id="year-select"
        className="year-selector-dropdown"
        value={selectedYear ?? 'latest'}
        onChange={handleYearChange}
      >
        <option value="latest">Latest Available</option>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
