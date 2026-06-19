import React from 'react';
import { Box } from '@mui/material';
import type { AppNotification } from '../types/notification';
import { NotificationCard } from './NotificationCard';
import { PriorityNotificationCard } from './PriorityNotificationCard';

interface NotificationListProps {
  notifications: AppNotification[];
  isPriorityMode?: boolean;
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications, isPriorityMode = false }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} role="list">
      {notifications.map((notif) => (
        <Box key={notif.id} role="listitem">
          {isPriorityMode ? (
            <PriorityNotificationCard notification={notif} />
          ) : (
            <NotificationCard notification={notif} />
          )}
        </Box>
      ))}
    </Box>
  );
};
