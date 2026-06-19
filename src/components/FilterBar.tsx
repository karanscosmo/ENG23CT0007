import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { NotificationType } from '../types/notification';
import { Log } from '../utils/logger';

interface FilterBarProps {
  filter: NotificationType | 'All';
  onFilterChange: (filter: NotificationType | 'All') => void;
  idPrefix?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange, idPrefix = 'filter' }) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value as NotificationType | 'All';
    Log('frontend', 'info', 'component', `Filter changed to ${newFilter}`);
    onFilterChange(newFilter);
  };

  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id={`${idPrefix}-label`}>Filter</InputLabel>
      <Select
        labelId={`${idPrefix}-label`}
        id={`${idPrefix}-select`}
        value={filter}
        label="Filter"
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Filter notifications by type' }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </Select>
    </FormControl>
  );
};
