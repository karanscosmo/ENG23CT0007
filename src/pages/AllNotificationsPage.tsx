import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import { FilterBar } from '../components/FilterBar';
import { NotificationList } from '../components/NotificationList';
import { PaginationControls } from '../components/PaginationControls';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import type { NotificationType } from '../types/notification';
import { Log } from '../utils/logger';

export const AllNotificationsPage: React.FC = () => {
  const { notifications, total, loading, error, params, updateParams, refetch } = useNotifications({ page: 1, limit: 10, notification_type: 'All' });

  useEffect(() => {
    Log('frontend', 'info', 'page', 'All Notifications Page loaded');
    return () => {
      Log('frontend', 'debug', 'page', 'All Notifications Page unloaded');
    };
  }, []);

  const handleFilterChange = (filter: NotificationType | 'All') => {
    updateParams({ notification_type: filter, page: 1 });
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    updateParams({ page: value });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">All Notifications</Typography>
        <FilterBar filter={params.notification_type || 'All'} onFilterChange={handleFilterChange} idPrefix="all" />
      </Box>

      {error && <ErrorState message={error} onRetry={refetch} />}

      {loading ? (
        <LoadingState />
      ) : notifications.length === 0 && !error ? (
        <EmptyState message="No notifications found for the selected criteria." />
      ) : (
        <>
          <NotificationList notifications={notifications} isPriorityMode={false} />
          <PaginationControls 
            total={total} 
            limit={params.limit || 10} 
            page={params.page || 1} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </Box>
  );
};

export default AllNotificationsPage;
