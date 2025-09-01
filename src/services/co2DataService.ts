import type { CO2Data, ProcessedCountry, YearlyData } from '../types/types';

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

export const processCountriesData = (
  data: CO2Data,
  targetYear?: number
): ProcessedCountry[] => {
  const countries: ProcessedCountry[] = [];

  for (const [countryName, countryData] of Object.entries(data)) {
    if (!countryData?.data || !Array.isArray(countryData.data)) {
      continue;
    }

    let targetData: YearlyData | undefined;
    let latestPopulation: number | undefined;
    let latestYear: number | undefined;
    let latestCO2: number | undefined;
    let latestCO2PerCapita: number | undefined;
    let latestMethane: number | undefined;
    let latestOilCO2: number | undefined;
    let latestTempChange: number | undefined;

    const validData = countryData.data.filter(
      (yearData) => yearData.population && yearData.population > 0
    );

    if (validData.length > 0) {
      if (targetYear) {
        targetData = validData.find((yearData) => yearData.year === targetYear);
        if (!targetData) {
          targetData = validData.reduce((closest, current) => {
            const closestDiff = Math.abs(closest.year - targetYear);
            const currentDiff = Math.abs(current.year - targetYear);
            return currentDiff < closestDiff ? current : closest;
          });
        }
      } else {
        targetData = validData[0];
        for (const yearData of validData) {
          if (yearData.year > targetData.year) {
            targetData = yearData;
          }
        }
      }

      latestPopulation = targetData?.population;
      latestYear = targetData?.year;
      latestCO2 = targetData?.co2;
      latestCO2PerCapita = targetData?.co2_per_capita;
      latestMethane = targetData?.methane;
      latestOilCO2 = targetData?.oil_co2;
      latestTempChange = targetData?.temperature_change_from_co2;
    }

    countries.push({
      name: countryName,
      isoCode: countryData.iso_code,
      population: latestPopulation,
      latestYear: latestYear,
      co2: latestCO2,
      co2_per_capita: latestCO2PerCapita,
      methane: latestMethane,
      oil_co2: latestOilCO2,
      temperature_change_from_co2: latestTempChange,
      year: latestYear,
    });
  }

  return countries;
};

export const getCountriesData = async (
  targetYear?: number
): Promise<ProcessedCountry[]> => {
  const rawData = await fetchCO2Data();
  return processCountriesData(rawData, targetYear);
};

export const getAvailableYears = async (): Promise<number[]> => {
  const rawData = await fetchCO2Data();
  const yearsSet = new Set<number>();

  for (const countryData of Object.values(rawData)) {
    if (countryData?.data && Array.isArray(countryData.data)) {
      countryData.data.forEach((yearData) => {
        if (yearData.population && yearData.population > 0) {
          yearsSet.add(yearData.year);
        }
      });
    }
  }

  return Array.from(yearsSet).sort((a, b) => b - a);
};
