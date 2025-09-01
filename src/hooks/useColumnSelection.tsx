import { useState, useMemo, useCallback } from 'react';
import type { ColumnOption, ColumnConfig } from '../types/types';

export const useColumnSelection = () => {
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig>({
    name: true,
    isoCode: true,
    latestYear: true,
    population: true,
    co2: true,
    co2_per_capita: true,
    methane: false,
    oil_co2: false,
    temperature_change_from_co2: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableAdditionalColumns: ColumnOption[] = useMemo(
    () => [
      {
        id: 'methane',
        label: 'Methane Emissions',
        defaultVisible: false,
      },
      {
        id: 'oil_co2',
        label: 'Oil CO₂ Emissions',
        defaultVisible: false,
      },
      {
        id: 'temperature_change_from_co2',
        label: 'Temperature Change from CO₂',
        defaultVisible: false,
      },
    ],
    []
  );

  const handleColumnsChange = useCallback((newConfig: ColumnConfig) => {
    setVisibleColumns(newConfig);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    visibleColumns,
    isModalOpen,
    availableAdditionalColumns,
    handleColumnsChange,
    handleOpenModal,
    handleCloseModal,
  };
};
