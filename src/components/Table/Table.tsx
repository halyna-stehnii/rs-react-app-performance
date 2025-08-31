import React from 'react';
import type { ProcessedCountry, ColumnConfig } from '../../types/types';
import './Table.css';

interface TableProps {
  countries: ProcessedCountry[];
  visibleColumns: ColumnConfig;
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

const formatMethane = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

const formatOilCO2 = (value: number): string => {
  return formatCO2(value);
};

const formatTempChange = (value: number): string => {
  return value.toFixed(3);
};

export const Table: React.FC<TableProps> = ({ countries, visibleColumns }) => {
  const validCountries = countries.filter(
    (country) => country.name && country.population
  );

  const columnDefinitions: Record<
    string,
    { header: string; className: string }
  > = {
    name: { header: 'Name', className: 'country-name' },
    isoCode: { header: 'ISO Code', className: 'iso-code' },
    latestYear: { header: 'Year', className: 'latest-year' },
    population: { header: 'Population', className: 'population' },
    co2: { header: 'CO₂', className: 'co2' },
    co2_per_capita: { header: 'CO₂ Per Capita', className: 'co2-per-capita' },
    methane: { header: 'Methane', className: 'methane' },
    oil_co2: { header: 'Oil CO₂', className: 'oil-co2' },
    temperature_change_from_co2: {
      header: 'Temp Change',
      className: 'temp-change',
    },
  };

  const getVisibleColumnKeys = () => {
    return Object.keys(columnDefinitions).filter(
      (key) => visibleColumns[key] === true
    );
  };

  const visibleColumnKeys = getVisibleColumnKeys();

  const renderCellContent = (country: ProcessedCountry, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return <span className="country-name-text">{country.name}</span>;

      case 'isoCode':
        return country.isoCode ? (
          <span className="iso-code-badge">{country.isoCode}</span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'latestYear':
        return country.latestYear ? (
          <span className="year-value">{country.latestYear}</span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'population':
        return country.population ? (
          <span className="population-value">
            {formatNumber(country.population)}
          </span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'co2':
        return country.co2 !== undefined && country.co2 !== null ? (
          <span className="co2-value">{formatCO2(country.co2)}</span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'co2_per_capita':
        return country.co2_per_capita !== undefined &&
          country.co2_per_capita !== null ? (
          <span className="co2-per-capita-value">
            {formatCO2PerCapita(country.co2_per_capita)}
          </span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'methane':
        return country.methane !== undefined && country.methane !== null ? (
          <span className="methane-value">
            {formatMethane(country.methane)}
          </span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'oil_co2':
        return country.oil_co2 !== undefined && country.oil_co2 !== null ? (
          <span className="oil-co2-value">{formatOilCO2(country.oil_co2)}</span>
        ) : (
          <span className="no-data">N/A</span>
        );

      case 'temperature_change_from_co2':
        return country.temperature_change_from_co2 !== undefined &&
          country.temperature_change_from_co2 !== null ? (
          <span className="temp-change-value">
            {formatTempChange(country.temperature_change_from_co2)}°C
          </span>
        ) : (
          <span className="no-data">N/A</span>
        );

      default:
        return <span className="no-data">N/A</span>;
    }
  };

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
              {visibleColumnKeys.map((columnKey) => (
                <th
                  key={columnKey}
                  className={columnDefinitions[columnKey]?.className}
                >
                  {columnDefinitions[columnKey]?.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {validCountries.map((country, index) => (
              <tr
                key={country.name}
                className={index % 2 === 0 ? 'even' : 'odd'}
              >
                {visibleColumnKeys.map((columnKey) => (
                  <td
                    key={columnKey}
                    className={columnDefinitions[columnKey]?.className}
                  >
                    {renderCellContent(country, columnKey)}
                  </td>
                ))}
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
