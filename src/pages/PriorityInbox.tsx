import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, Chip, SelectChangeEvent } from '@mui/material';
import { usePriorityNotifications } from '../hooks/usePriorityNotifications';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import { NotificationType } from '../types';
import { Log } from '../utils/logger';
import { calculatePriority } from '../utils/priorityCalculator';

const PriorityInbox: React.FC = () => {
  const { viewedIds, markAsViewed } = useViewedNotifications();
  const [topN, setTopN] = useState<number>(10);
  const [filter, setFilter] = useState<NotificationType | 'All'>('All');
  
  const { priorityNotifications, loading, error } = usePriorityNotifications(topN, filter);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value as NotificationType | 'All';
    setFilter(newFilter);
    Log('page', 'info', 'PriorityInbox', `Filter changed to ${newFilter}`);
  };

  const handleTopNChange = (event: SelectChangeEvent<number>) => {
    const newTopN = event.target.value as number;
    setTopN(newTopN);
    Log('page', 'info', 'PriorityInbox', `Top N changed to ${newTopN}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4">Priority Inbox</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="top-n-label">Show Top</InputLabel>
            <Select
              labelId="top-n-label"
              value={topN}
              label="Show Top"
              onChange={handleTopNChange}
            >
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>
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
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : priorityNotifications.length === 0 ? (
        <Alert severity="info">No priority notifications found.</Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {priorityNotifications.map((notif) => {
            const isViewed = viewedIds.has(notif.id);
            const score = calculatePriority(notif);
            return (
              <Card 
                key={notif.id} 
                sx={{ 
                  bgcolor: isViewed ? 'background.default' : '#fff3e0',
                  borderLeft: isViewed ? 'none' : '4px solid #ed6c02',
                  cursor: 'pointer'
                }}
                onClick={() => markAsViewed(notif.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip label={notif.type} size="small" color={notif.type === 'Placement' ? 'primary' : notif.type === 'Result' ? 'success' : 'default'} />
                        {!isViewed && <Chip label="NEW" size="small" color="secondary" />}
                        <Chip label={`Priority Score: ${score}`} size="small" variant="outlined" />
                      </Box>
                      <Typography variant="body1" color={isViewed ? 'text.secondary' : 'text.primary'} sx={{ fontWeight: isViewed ? 'normal' : 'bold' }}>
                        {notif.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notif.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default PriorityInbox;
