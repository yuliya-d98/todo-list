import React, { memo } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type SeverityType = 'info' | 'success' | 'warning' | 'error';
export type SnackbarInfoType = {
  severity: SeverityType;
  message: string;
  id: string;
};

type CustomizedSnackbarsProps = {
  snackbarInfo: SnackbarInfoType[];
  setSnackbarInfo: React.Dispatch<React.SetStateAction<SnackbarInfoType[]>>;
};

const CustomizedSnackbars = memo((props: CustomizedSnackbarsProps) => {
  const { snackbarInfo, setSnackbarInfo } = props;

  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: {
          xs: 90,
          custom450: 16,
        },
        width: {
          xs: 250,
          custom450: 'auto',
        },
        left: 16,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      spacing={2}
    >
      {snackbarInfo.map((info) => (
        <MyAlert key={info.id} info={info} setSnackbarInfo={setSnackbarInfo} />
      ))}
    </Stack>
  );
});

export default CustomizedSnackbars;

type MyAlertProps = {
  info: SnackbarInfoType;
  setSnackbarInfo: React.Dispatch<React.SetStateAction<SnackbarInfoType[]>>;
};

const MyAlert = memo((props: MyAlertProps) => {
  const { info, setSnackbarInfo } = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarInfo((snackbarInfo) => snackbarInfo.filter((oldInfo) => oldInfo.id !== info.id));
  };

  return (
    <Snackbar
      open={!!info}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ position: 'relative' }}
    >
      <Alert onClose={handleClose} severity={info.severity} sx={{ width: '100%' }} variant="filled">
        {info.message}
      </Alert>
    </Snackbar>
  );
});
