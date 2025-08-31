import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search countries by name...',
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="search-clear-button"
            type="button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
