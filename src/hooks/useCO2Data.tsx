import { useMemo } from 'react';
import type { ProcessedCountry } from '../types/types';
import { getCountriesData } from '../services/co2DataService';

interface SuspenseResource<T> {
  read(): T;
}

let globalResource: SuspenseResource<ProcessedCountry[]> | null = null;

export const createCountriesResource = (): SuspenseResource<
  ProcessedCountry[]
> => {
  if (globalResource) {
    return globalResource;
  }

  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: ProcessedCountry[] | Error;

  const suspender = getCountriesData()
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

  globalResource = resource;
  return resource;
};

export const useCO2Data = (): SuspenseResource<ProcessedCountry[]> => {
  const resource = useMemo(() => createCountriesResource(), []);
  return resource;
};

export const useCO2Countries = (): ProcessedCountry[] => {
  const resource = useCO2Data();
  return resource.read();
};
