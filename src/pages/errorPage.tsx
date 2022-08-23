import Typography from '@mui/material/Typography';

const ErrorPage = () => {
  return (
    <Typography
      variant="h6"
      sx={{
        mt: '20px',
        mb: '10px',
        maxWidth: { xs: '250px', custom450: '400px', md: '800px' },
        mx: 'auto',
      }}
    >
      Oops! Some error occured.
    </Typography>
  );
};

export default ErrorPage;
