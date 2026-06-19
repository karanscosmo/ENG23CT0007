import React from 'react';
import { Alert } from '@mui/material';
import { Log } from '../utils/logger';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = 'No items found.' }) => {
  React.useEffect(() => {
    Log('frontend', 'debug', 'component', 'Empty state displayed');
  }, []);

  return (
    <Alert severity="info" role="status">
      {message}
    </Alert>
  );
};
