import React, { memo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type MyBackdropProps = {
  isLoading: boolean;
};

const MyBackdrop = memo(({ isLoading }: MyBackdropProps) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

export default MyBackdrop;
