import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const openTodo = () => {
    navigate('/todos', { replace: true });
  };

  return (
    <>
      <Typography
        align="center"
        variant="h3"
        sx={{
          mt: { xs: '50px', custom450: '100px' },
          maxWidth: { sx: '250px', custom450: '400px', md: 800 },
          mx: 'auto',
        }}
      >
        Organize your work and life, finally.
      </Typography>
      <Typography
        align="center"
        variant="h6"
        sx={{
          mt: '20px',
          maxWidth: { xs: '250px', custom450: '400px', md: '800px' },
          mx: 'auto',
        }}
      >
        Become focused, organized, and calm with Todolist.
      </Typography>
      <Button
        variant="contained"
        onClick={openTodo}
        sx={{ display: 'block', mx: 'auto', mt: '30px' }}
      >
        Start
      </Button>
    </>
  );
};

export default WelcomePage;
