import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { Log } from '../utils/logger';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  React.useEffect(() => {
    Log('frontend', 'error', 'component', `Error state displayed: ${message}`);
  }, [message]);

  const handleRetry = () => {
    Log('frontend', 'info', 'component', 'Recovery attempted via retry button');
    if (onRetry) onRetry();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Alert severity="error" role="alert" action={
        onRetry && (
          <Button color="inherit" size="small" onClick={handleRetry} aria-label="Retry fetching data">
            Retry
          </Button>
        )
      }>
        {message}
      </Alert>
    </Box>
  );
};
