import React from 'react';
import type { ProcessedCountry } from '../../types/types';
import './Table.css';

interface TableProps {
  countries: ProcessedCountry[];
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const formatCO2 = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

const formatCO2PerCapita = (value: number): string => {
  return value.toFixed(2);
};

export const Table: React.FC<TableProps> = ({ countries }) => {
  const validCountries = countries
    .filter((country) => country.name && country.population)
    .sort((a, b) => (b.population || 0) - (a.population || 0));

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>
          CO<sub>2</sub> Emissions Data by Country
        </h2>
      </div>

      <div className="table-wrapper">
        <table className="countries-table">
          <thead>
            <tr>
              <th className="country-name">Name</th>
              <th className="iso-code">ISO Code</th>
              <th className="latest-year">Year</th>
              <th className="population">Population</th>
              <th className="co2">
                CO<sub>2</sub>
              </th>
              <th className="co2-per-capita">
                CO<sub>2</sub> Per Capita
              </th>
            </tr>
          </thead>
          <tbody>
            {validCountries.map((country, index) => (
              <tr
                key={country.name}
                className={index % 2 === 0 ? 'even' : 'odd'}
              >
                <td className="country-name">
                  <span className="country-name-text">{country.name}</span>
                </td>
                <td className="iso-code">
                  {country.isoCode ? (
                    <span className="iso-code-badge">{country.isoCode}</span>
                  ) : (
                    <span className="no-data">N/A</span>
                  )}
                </td>
                <td className="latest-year">
                  {country.latestYear ? (
                    <span className="year-value">{country.latestYear}</span>
                  ) : (
                    <span className="no-data">N/A</span>
                  )}
                </td>
                <td className="population">
                  {country.population ? (
                    <span className="population-value">
                      {formatNumber(country.population)}
                    </span>
                  ) : (
                    <span className="no-data">N/A</span>
                  )}
                </td>
                <td className="co2">
                  {country.co2 !== undefined && country.co2 !== null ? (
                    <span className="co2-value">{formatCO2(country.co2)}</span>
                  ) : (
                    <span className="no-data">N/A</span>
                  )}
                </td>
                <td className="co2-per-capita">
                  {country.co2_per_capita !== undefined &&
                  country.co2_per_capita !== null ? (
                    <span className="co2-per-capita-value">
                      {formatCO2PerCapita(country.co2_per_capita)}
                    </span>
                  ) : (
                    <span className="no-data">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {validCountries.length === 0 && (
        <div className="empty-state">
          <p>No countries with population data found.</p>
        </div>
      )}
    </div>
  );
};

export default Table;
