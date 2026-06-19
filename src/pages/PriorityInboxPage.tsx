import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { usePriorityNotifications } from '../hooks/usePriorityNotifications';
import { FilterBar } from '../components/FilterBar';
import { NotificationList } from '../components/NotificationList';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import type { NotificationType } from '../types/notification';
import { Log } from '../utils/logger';

export const PriorityInboxPage: React.FC = () => {
  const [topN, setTopN] = useState<number>(10);
  const [filter, setFilter] = useState<NotificationType | 'All'>('All');
  
  const { priorityNotifications, loading, error, refetch } = usePriorityNotifications(topN, filter);

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Priority Inbox Page loaded');
    return () => {
      Log('frontend', 'debug', 'page', 'Priority Inbox Page unloaded');
    };
  }, []);

  const handleFilterChange = (newFilter: NotificationType | 'All') => {
    setFilter(newFilter);
  };

  const handleTopNChange = (event: SelectChangeEvent<number>) => {
    const newTopN = Number(event.target.value);
    setTopN(newTopN);
    Log('frontend', 'info', 'page', `Priority Top N changed to ${newTopN}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1">Priority Inbox</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="top-n-label">Show Top</InputLabel>
            <Select
              labelId="top-n-label"
              value={topN}
              label="Show Top"
              onChange={handleTopNChange}
              inputProps={{ 'aria-label': 'Select top N priority items' }}
            >
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>
          <FilterBar filter={filter} onFilterChange={handleFilterChange} idPrefix="priority" />
        </Box>
      </Box>

      {error && <ErrorState message={error} onRetry={refetch} />}

      {loading ? (
        <LoadingState />
      ) : priorityNotifications.length === 0 && !error ? (
        <EmptyState message="No priority notifications found." />
      ) : (
        <NotificationList notifications={priorityNotifications} isPriorityMode={true} />
      )}
    </Box>
  );
};

export default PriorityInboxPage;
