import React from 'react';
import { Chip } from '@mui/material';

export const ViewedBadge: React.FC = () => {
  return (
    <Chip 
      label="NEW" 
      size="small" 
      color="secondary" 
      aria-label="Unread notification"
    />
  );
};
