import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { AppNotification } from '../types/notification';
import { ViewedBadge } from './ViewedBadge';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import { calculatePriority } from '../utils/priorityCalculator';

interface PriorityNotificationCardProps {
  notification: AppNotification;
}

export const PriorityNotificationCard: React.FC<PriorityNotificationCardProps> = ({ notification }) => {
  const { isViewed, markAsViewed } = useViewedNotifications();
  const viewed = isViewed(notification.id);
  const score = calculatePriority(notification);

  const getChipColor = () => {
    switch (notification.type) {
      case 'Placement': return 'primary';
      case 'Result': return 'success';
      case 'Event': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        bgcolor: viewed ? 'background.default' : '#fff3e0',
        borderLeft: viewed ? 'none' : '4px solid #ed6c02',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
      onClick={() => markAsViewed(notification.id)}
      role="button"
      tabIndex={0}
      aria-label={`Priority ${score}, ${viewed ? 'Viewed' : 'Unread'} ${notification.type} notification: ${notification.message}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') markAsViewed(notification.id);
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={notification.type} size="small" color={getChipColor()} />
          {!viewed && <ViewedBadge />}
          <Chip label={`Priority: ${score}`} size="small" variant="outlined" color="warning" />
        </Box>
        <Typography 
          variant="body1" 
          color={viewed ? 'text.secondary' : 'text.primary'} 
          sx={{ fontWeight: viewed ? 'normal' : 'bold' }}
        >
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(notification.timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
