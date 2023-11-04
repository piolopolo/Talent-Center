import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Divider, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Navbar from 'components/Navbar';
import Carousel from 'components/Carousel';
import GalleryModal from 'components/GalleryModal';
import { useParams } from 'react-router-dom';
import { downloadCV, fetchTalentData, addToWishlist, fetchWishlist } from 'apis';
import AddToListAlert from 'components/GlobalAlert';

const TalentTag = ({ tagTitle }) => {
  return (
    <Box sx={{ mr: '0.5rem', backgroundColor: '#E4EEF6', borderRadius: '3px', my: { xs: '0.25rem', md: '0' } }}>
      <Typography variant="body2" fontFamily="Inter" sx={{ padding: '2px 5px' }}>
        {tagTitle}
      </Typography>
    </Box>
  );
};

const Detail = () => {
  const [dummyData, setDummyData] = useState({});
  const [slides, setSlides] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [isLogin] = useState(localStorage.getItem('isLogin') === 'true');

  const userId = localStorage.getItem('userId');

  const listData = [
    'Back-end (NodeJS/Python/ & Django/Core PHP/Laravel/Symfony)',
    'Front-end (ReactJS/Redux, VueJS/Vuex/NextJS, AngularJS, Angular/Ngnx)',
    'DB (Mysql, Oracle, MongoDB, Firebase)',
    'HTML5 / XHTML / CSS3 / Javascript / Bootstrap',
    'Chrome extension development',
    'UnitTesting (Mocha, Chai, Java, Puppeteer-Jest, Phanton)',
    'Responsible communication for each day(24/7 online)',
    '2 months Free bug fixing and maintenance',
  ];

  const handleGalleryOpen = (index) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
  };

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const data = await fetchTalentData(id);
      setDummyData(data);
      setSlides([
        {
          type: 'image',
          url: data.talentPhotoUrl,
        },
        { type: 'video', url: data.biographyVideoUrl },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateTalentInWishlist = async (userId) => {
    fetchWishlist(userId)
      .then((response) => {
        const talentIds = response.data.map((item) => item.talentId);
        setInWishlist(talentIds.includes(parseInt(id)));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    updateTalentInWishlist(userId);
  }, [id]);

  const handleAddToList = async () => {
    try {
      if (!dummyData.talentId) {
        console.error('Talent ID is missing or invalid');
        return;
      }

      const userId = localStorage.getItem('userId');
      const success = await addToWishlist(dummyData.talentId, userId);

      if (success) {
        setAlertOpen(true);
        setAlertMessage('Added to wishlist successfully!!');
        setAlertSeverity('success');

        updateTalentInWishlist(id);
      }
    } catch (error) {
      console.error(error);
      setAlertOpen(true);
      setAlertMessage('An error occurred during add to wishlist operation.');
      setAlertSeverity('error');
    }
  };

  const handleDownloadCV = (talentId, talentName) => {
    downloadCV(talentId)
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Determine the filename for the downloaded file
        let filename = 'CV ' + talentName + '.pdf';
        const contentDispositionHeader = response.headers['content-disposition'];
        if (contentDispositionHeader && typeof contentDispositionHeader === 'string') {
          const filenameMatch = contentDispositionHeader.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1].replace(/['"]/g, '');
          }
        }

        // Create a URL object from the blob data
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.click();

        // Clean up the temporary URL object
        window.URL.revokeObjectURL(blobUrl);

        console.log('CV berhasil di download');
      })
      .catch((error) => {
        console.error('Error downloading CV:', error);
      });
  };

  return (
    <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
      <AddToListAlert open={alertOpen} onClose={() => setAlertOpen(false)} str={alertMessage} severity={alertSeverity} />

      <Navbar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Container sx={{ boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)', borderRadius: '10px', paddingTop: '20px', paddingBottom: '20px' }}>
          <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Grid item sx={{ m: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Carousel data-testid="carousel-item" items={slides} onClickItem={handleGalleryOpen} />
              <GalleryModal items={slides} open={isGalleryOpen} initialIndex={galleryIndex} onClose={handleGalleryClose} />
              <div style={{ width: '100%' }}>
                <Button
                  sx={{ textTransform: 'capitalize', fontFamily: 'Inter', my: '0.5rem', width: '100%' }}
                  variant="contained"
                  disabled={inWishlist || !isLogin || !dummyData.talentAvailability}
                  onClick={handleAddToList}
                >
                  {inWishlist ? 'In Wishlist' : ' + Add to List'}
                </Button>
                <Button
                  onClick={() => handleDownloadCV(dummyData.talentId, dummyData.talentName)}
                  startIcon={<UploadFileIcon />}
                  sx={{ textTransform: 'none', color: '#848484', backgroundColor: 'white', fontFamily: 'Inter', my: '0.5rem', width: '100%' }}
                >
                  Download CV
                </Button>
                <Divider sx={{ display: { xs: 'flex', sm: 'none' } }} />
              </div>
            </Grid>
            <Grid item sx={{ m: '1rem' }}>
              <Grid>
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.5rem', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Grid item>
                    <Typography
                      variant="body2"
                      fontFamily="Inter"
                      sx={{
                        padding: '2px 8px',
                        color: dummyData.talentAvailability === true ? 'green' : 'red',
                        border: 'solid',
                        borderWidth: '1px',
                        borderRadius: '15px',
                      }}
                    >
                      {/* {dummyData.talentStatus} */}
                      {dummyData?.talentAvailability === true ? 'Available' : 'Not Available'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" fontWeight="Bold" fontFamily="Poppins" sx={{ color: '#2C8AD3' }}>
                      {dummyData.talentName}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.75rem', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Grid item>
                    <Typography variant="body2" fontFamily="Inter" sx={{ color: '#848484' }}>
                      {dummyData.talentExperience} Years of Experience
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Box sx={{ width: '4px', height: '4px', backgroundColor: '#848484', borderRadius: '100%' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" fontFamily="Inter" sx={{ color: '#848484' }}>
                      {dummyData?.talentLevel} Level
                    </Typography>
                  </Grid>
                </Grid>

                <Typography fontFamily="Poppins" display="flex" sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  <b>Position</b>
                </Typography>
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.75rem', gap: '0.1rem', alignItems: 'center' }}
                >
                  {dummyData.position !== undefined &&
                    dummyData.position.map((position) => {
                      return <TalentTag tagTitle={position?.positionName} />;
                    })}
                </Grid>

                <Typography fontFamily="Poppins" display="flex" sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  <b>Skill Set</b>
                </Typography>
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.75rem', gap: '0.1rem', alignItems: 'center' }}
                >
                  {dummyData.skillSet !== undefined &&
                    dummyData.skillSet.map((skill) => {
                      return <TalentTag tagTitle={skill?.skillsetName} />;
                    })}
                </Grid>

                <Typography fontFamily="Poppins" display="flex" sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  <b>Project Completed</b>
                </Typography>
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.75rem', gap: '0.1rem', alignItems: 'center' }}
                >
                  <Typography variant="body2" fontFamily="Inter">
                    {dummyData.projectCompleted} Projects
                  </Typography>
                </Grid>

                <Typography fontFamily="Poppins" display="flex" sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  <b>Total Requested</b>
                </Typography>
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.75rem', gap: '0.1rem', alignItems: 'center' }}
                >
                  <Typography variant="body2" fontFamily="Inter">
                    {dummyData.totalRequested} Requested
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container> */}
          <Grid item sx={{ m: '1rem' }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="Bold" fontFamily="Poppins" sx={{ color: '#2C8AD3', mt: 2 }}>
              About
            </Typography>
            <Typography data-testid="about-text" variant="body2" fontFamily="Inter" sx={{ my: 2, textAlign: 'justify' }}>
              {dummyData.about}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              SKILL
              {listData.map((item, index) => (
                <Typography key={index} component="li">
                  {item}
                </Typography>
              ))}
              <br />I look forward to taking on your project and building you a site you are proud of
            </Typography>
          </Grid>
          {/* </Grid> */}
        </Container>
      </Box>
    </Box>
  );
};

export default Detail;
