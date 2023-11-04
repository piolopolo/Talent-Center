import { useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import Navbar from 'components/NavbarLanding';
import SearchBox from 'components/SearchBox';
import { styled, Typography, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { fetchPopularTags } from 'apis';
import LogRocket from 'logrocket';

LogRocket.init('eazbps/iqbal-center');

const Item = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '8px',
  paddingLeft: '15px',
  paddingRight: '15px',
  textAlign: 'center',
  borderRadius: 4,
  fontFamily: 'Inter',
  fontSize: '14px',
  fontWeight: 600,
  '@media (max-width: 600px)': {
    padding: '6px',
    paddingLeft: '25px',
    paddingRight: '25px',
    borderRadius: '3px',
    fontSize: '12px',
  },
}));

const LandingPage = () => {
  const [welcomeText, setWelcomeText] = useState(0);
  const [popularTags, setPopularTags] = useState([]);
  const [fadeTransition, setFadeTransition] = useState(false);

  const welcomeTexts = [
    'Welcome to\nTalent Center 79',
    'Find a Talent\nThat Suits Your Requirements',
    'Build the Perfect Team\nFor the Brighter Future',
  ];

  const handleSearch = () => {
    console.log('Search clicked!');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPopularTags();
        const temp = response.data.sort((a, b) => b.counter - a.counter);
        setPopularTags(temp);
        setFadeTransition(true); // Trigger the transition
        setTimeout(() => {
          setFadeTransition(false); // Disable the transition
          setWelcomeText((prevText) => (prevText + 1) % welcomeTexts.length);
        }, 500); // Transition duration
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setFadeTransition(true); // Trigger the transition
      setTimeout(() => {
        setFadeTransition(false); // Disable the transition
        setWelcomeText((prevText) => (prevText + 1) % welcomeTexts.length);
      }, 500); // Transition duration
    }, 5000); // Text change interval

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/resource/image/discussion.svg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '110vh',
          position: 'relative',
          '@media (max-width: 600px)': {
            height: '800px',
          },
        }}
      />
      <Box
        sx={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '110vh',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          '@media (max-width: 600px)': {
            height: '800px',
          },
        }}
      >
        <Navbar />
        <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '53px',
              fontWeight: 700,
              lineHeight: '80px',
              letterSpacing: '0em',
              textAlign: 'center',
              maxWidth: '650px',
              '@media (max-width: 600px)': {
                fontSize: '32px',
                lineHeight: '48px',
              },
              transition: 'opacity 0.5s ease-in-out', // Added transition effect
              opacity: fadeTransition ? 0 : 1, // Apply the transition
            }}
            variant="h2"
            color="white"
            align="center"
            marginBottom="50px"
          >
            {welcomeTexts[welcomeText]}
          </Typography>
          <Grid container justifyContent="center" marginBottom="10px">
            <Grid item>
              <SearchBox handleSearch={handleSearch} />
            </Grid>
          </Grid>
          <Grid marginBottom={30}>
            <Grid container mt={3}>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'white',
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'center',
                  }}
                >
                  Popular
                </Typography>
                <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'white',
                      display: { xs: 'none', md: 'flex' },
                    }}
                  >
                    Popular
                  </Typography>
                  {popularTags.map((skill, index) => (
                    <Item key={index} sx={{ marginBottom: '10px', gap: '3px' }}>
                      {skill.skillsetName}
                    </Item>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <footer style={{ background: '#142B51', padding: '80px' }}>
        <Grid container spacing={10} sx={{ justifyContent: 'center' }}>
          <Grid
            item
            md={3}
            sx={{
              '@media (max-width: 600px)': {
                textAlign: 'center',
              },
            }}
          >
            <Typography
              sx={{
                lineHeight: 2,
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              Useful Links
            </Typography>
            <Typography
              sx={{
                borderBottom: '2px solid #FF6E1D',
                width: '80px',
                mb: 2,
                '@media (max-width: 600px)': {
                  display: 'inline-block',
                },
              }}
            ></Typography>
            <div>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Home
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Our Technologies
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Why Choose Us
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Testimonials
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Contact
              </p>
            </div>
          </Grid>
          <Grid
            item
            md={3}
            sx={{
              diplay: 'right',
              '@media (max-width: 600px)': {
                textAlign: 'center',
              },
            }}
          >
            <Typography
              color="white"
              sx={{
                lineHeight: '35px',
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                color: '#142B51',
                borderBottom: '2px solid #FF6E1D',
                width: '80px',
                mb: 2,
                '@media (max-width: 600px)': {
                  display: 'inline-block',
                },
              }}
            ></Typography>
            <div color="white">
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                <Typography component="span" fontWeight="bold">
                  Address:
                </Typography>
                Kompleks Terasana No.6A <br />
                Jalan Cihampelas (Bawah) <br />
                Bandung 40171
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                <Typography component="span" fontWeight="bold">
                  Phone:
                </Typography>{' '}
                (022) 20505455
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  lineHeight: '35px',
                }}
              >
                Follow Us On
              </p>
              <Grid mt={2}>
                <FacebookIcon style={{ marginRight: '15px', color: 'white' }} />
                <InstagramIcon style={{ marginRight: '15px', color: 'white' }} />
                <YouTubeIcon style={{ marginRight: '15px', color: 'white' }} />
              </Grid>
              <Grid
                sx={{
                  marginTop: '20px',
                  '@media (max-width: 600px)': {
                    justifyContent: 'center',
                  },
                }}
              >
                <img src={`${process.env.PUBLIC_URL}/resource/image/logotujuhsembilan2.svg`} alt="logotujuhsembilan" />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </footer>
      <footer style={{ background: '#081E43', padding: '40px', textAlign: 'center' }}>
        <Typography variant="body2" color="white">
          &copy;
          <Typography component="span" color="white" fontWeight="bold">
            Copyright 2020
          </Typography>
          <br />
          Privacy Policy Design <br />
          By Tujuh Sembilan
        </Typography>
      </footer>
    </div>
  );
};

export default LandingPage;
