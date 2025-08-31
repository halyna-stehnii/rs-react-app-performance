import type { CO2Data, ProcessedCountry } from '../types/types';

let dataCache: CO2Data | null = null;
let dataPromise: Promise<CO2Data> | null = null;

const CO2_DATA_URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const fetchCO2Data = async (): Promise<CO2Data> => {
  if (dataCache) {
    return dataCache;
  }

  if (dataPromise) {
    return dataPromise;
  }

  dataPromise = new Promise((resolve, reject) => {
    fetch(CO2_DATA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<CO2Data>;
      })
      .then((data) => {
        dataCache = data;
        resolve(data);
      })
      .catch((error) => {
        console.error('Failed to fetch CO2 data:', error);
        dataPromise = null;
        reject(
          new Error(
            `Failed to fetch CO2 emissions data: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          )
        );
      });
  });

  return dataPromise;
};

export const processCountriesData = (data: CO2Data): ProcessedCountry[] => {
  const countries: ProcessedCountry[] = [];

  for (const [countryName, countryData] of Object.entries(data)) {
    if (!countryData?.data || !Array.isArray(countryData.data)) {
      continue;
    }

    let latestPopulation: number | undefined;
    let latestYear: number | undefined;
    let latestCO2: number | undefined;
    let latestCO2PerCapita: number | undefined;

    const validData = countryData.data.filter(
      (yearData) => yearData.population && yearData.population > 0
    );

    if (validData.length > 0) {
      let latestData = validData[0];
      for (const yearData of validData) {
        if (yearData.year > latestData.year) {
          latestData = yearData;
        }
      }

      latestPopulation = latestData.population;
      latestYear = latestData.year;
      latestCO2 = latestData.co2;
      latestCO2PerCapita = latestData.co2_per_capita;
    }

    countries.push({
      name: countryName,
      isoCode: countryData.iso_code,
      population: latestPopulation,
      latestYear: latestYear,
      co2: latestCO2,
      co2_per_capita: latestCO2PerCapita,
    });
  }

  return countries;
};

export const getCountriesData = async (): Promise<ProcessedCountry[]> => {
  const rawData = await fetchCO2Data();
  return processCountriesData(rawData);
};
