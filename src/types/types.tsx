export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
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
}
