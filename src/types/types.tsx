export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
}

export interface CountryData {
  iso_code?: string;
  data: YearlyData[];
}

export interface CO2Data {
  [countryName: string]: CountryData;
}

export interface ProcessedCountry {
  name: string;
  isoCode?: string;
  population?: number;
  latestYear?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  year?: number;
}

export interface ColumnOption {
  id: keyof ProcessedCountry;
  label: string;
  unit?: string;
  defaultVisible: boolean;
}

export interface ColumnConfig {
  [key: string]: boolean;
}
