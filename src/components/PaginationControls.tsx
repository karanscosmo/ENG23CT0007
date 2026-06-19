import React from 'react';
import { Box, Pagination } from '@mui/material';
import { Log } from '../utils/logger';

interface PaginationControlsProps {
  total: number;
  limit: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ total, limit, page, onPageChange }) => {
  if (total <= 0) return null;

  const count = Math.ceil(total / limit);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    Log('frontend', 'info', 'component', `Pagination changed to page ${value}`);
    onPageChange(event, value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination 
        count={count} 
        page={page} 
        onChange={handleChange} 
        color="primary" 
        aria-label="Notification pages"
      />
    </Box>
  );
};
