import { useMemo } from 'react';
import type { ProcessedCountry } from '../types/types';
import {
  getCountriesData,
  getAvailableYears,
} from '../services/co2DataService';

interface SuspenseResource<T> {
  read(): T;
}

let yearResource: SuspenseResource<number[]> | null = null;
const yearBasedResources: Map<
  number | undefined,
  SuspenseResource<ProcessedCountry[]>
> = new Map();

export const createCountriesResource = (
  targetYear?: number
): SuspenseResource<ProcessedCountry[]> => {
  const cacheKey = targetYear;

  const existingResource = yearBasedResources.get(cacheKey);
  if (existingResource) {
    return existingResource;
  }

  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: ProcessedCountry[] | Error;

  const suspender = getCountriesData(targetYear)
    .then((data) => {
      status = 'success';
      result = data;
    })
    .catch((error) => {
      status = 'error';
      result = error;
    });

  const resource = {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result as ProcessedCountry[];
      }

      throw new Error('Unexpected status');
    },
  };

  yearBasedResources.set(cacheKey, resource);
  return resource;
};

export const createYearsResource = (): SuspenseResource<number[]> => {
  if (yearResource) {
    return yearResource;
  }

  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: number[] | Error;

  const suspender = getAvailableYears()
    .then((data) => {
      status = 'success';
      result = data;
    })
    .catch((error) => {
      status = 'error';
      result = error;
    });

  const resource = {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result as number[];
      }

      throw new Error('Unexpected status');
    },
  };

  yearResource = resource;
  return resource;
};

export const useCO2Data = (
  targetYear?: number
): SuspenseResource<ProcessedCountry[]> => {
  const resource = useMemo(
    () => createCountriesResource(targetYear),
    [targetYear]
  );
  return resource;
};

export const useCO2Countries = (targetYear?: number): ProcessedCountry[] => {
  const resource = useCO2Data(targetYear);
  return resource.read();
};

export const useAvailableYears = (): number[] => {
  const resource = useMemo(() => createYearsResource(), []);
  return resource.read();
};
