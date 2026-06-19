import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Alert, Pagination, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import type { NotificationType } from '../types';
import { Log } from '../utils/logger';

const AllNotifications: React.FC = () => {
  const { viewedIds, markAsViewed } = useViewedNotifications();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<NotificationType | 'All'>('All');
  
  const limit = 10;
  const { notifications, total, loading, error } = useNotifications({
    page,
    limit,
    notification_type: filter
  });

  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value as NotificationType | 'All';
    setFilter(newFilter);
    setPage(1);
    Log('page', 'info', 'AllNotifications', `Filter changed to ${newFilter}`);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    Log('page', 'info', 'AllNotifications', `Pagination changed to page ${value}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">All Notifications</Typography>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Alert severity="info">No notifications found.</Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {notifications.map((notif) => {
            const isViewed = viewedIds.has(notif.id);
            return (
              <Card 
                key={notif.id} 
                sx={{ 
                  bgcolor: isViewed ? 'background.default' : 'background.paper',
                  borderLeft: isViewed ? 'none' : '4px solid #1976d2',
                  cursor: 'pointer'
                }}
                onClick={() => markAsViewed(notif.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip label={notif.type} size="small" color={notif.type === 'Placement' ? 'primary' : notif.type === 'Result' ? 'success' : 'default'} />
                    {!isViewed && <Chip label="NEW" size="small" color="secondary" />}
                  </Box>
                  <Typography variant="body1" color={isViewed ? 'text.secondary' : 'text.primary'} sx={{ fontWeight: isViewed ? 'normal' : 'bold' }}>
                    {notif.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notif.timestamp).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {total > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={Math.ceil(total / limit)} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
};

export default AllNotifications;
