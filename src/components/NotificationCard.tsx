import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { AppNotification } from '../types/notification';
import { ViewedBadge } from './ViewedBadge';
import { useViewedNotifications } from '../hooks/useViewedNotifications';

interface NotificationCardProps {
  notification: AppNotification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { isViewed, markAsViewed } = useViewedNotifications();
  const viewed = isViewed(notification.id);

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
        bgcolor: viewed ? 'background.default' : 'background.paper',
        borderLeft: viewed ? 'none' : '4px solid #1976d2',
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
      aria-label={`${viewed ? 'Viewed' : 'Unread'} ${notification.type} notification: ${notification.message}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') markAsViewed(notification.id);
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip label={notification.type} size="small" color={getChipColor()} />
          {!viewed && <ViewedBadge />}
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
