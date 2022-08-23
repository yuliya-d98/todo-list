import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const links = [
  { href: 'https://github.com/yuliya-d98/', title: 'My Github' },
  { href: 'https://www.linkedin.com/in/yuliya-dubovik/', title: 'My LinkedIn' },
  { href: 'mailto:feelgloom@gmail.com', title: 'My Gmail' },
];

const libs = [
  'typescript',
  'react',
  'react-redux',
  'react-router-dom',
  'redux',
  'redux-thunk',
  'axios',
  'eslint',
  'prettier',
  'uuid',
];

const AboutPage = () => {
  return (
    <>
      <AboutHeader text="About me:" />
      <Box
        sx={{
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 3,
          },
        }}
      >
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.title}
          </Link>
        ))}
      </Box>
      <AboutHeader text="About app:" />
      <Typography variant="body1" gutterBottom>
        While creating this app I used such libraries as:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {libs.map((item) => (
          <Button variant="contained" key={item} sx={{ cursor: 'default' }}>
            {item}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default AboutPage;

type AboutHeaderProps = {
  text: string;
};
const AboutHeader = ({ text }: AboutHeaderProps) => {
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
      {text}
    </Typography>
  );
};
