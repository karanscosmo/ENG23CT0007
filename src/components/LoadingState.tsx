import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Log } from '../utils/logger';

export const LoadingState: React.FC = () => {
  React.useEffect(() => {
    Log('frontend', 'debug', 'component', 'Loading state displayed');
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
      <CircularProgress aria-label="Loading content" />
    </Box>
  );
};
