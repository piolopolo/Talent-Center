import { useState, useEffect } from 'react';
import { Divider, Typography, Button, Box, Grid, Chip, Container, Avatar } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DeleteOutlineOutlined, SimCardDownloadOutlined } from '@mui/icons-material';
import Navbar from 'components/Navbar';
import { useNavigate } from 'react-router-dom';
import RequestSuccessModal from 'components/modals/RequestSuccessModal';
import DeleteWishlistModal from 'components/modals/DeleteWishlistModal';
import { fetchWishlist, removeWishlist, downloadCV, removeAllWishlist, requestAllWishlist } from 'apis';
import WishlistAlert from 'components/GlobalAlert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Wishlist() {
  const bg_not_find_data = `${process.env.PUBLIC_URL}/resource/image/empty-wishlist.png`;

  const [talentData, setTalentData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteWishlistModalOpen, setDeleteWishlistModalOpen] = useState(false);
  const [deleteAllWishlistModalOpen, setDeleteAllWishlistModalOpen] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState(null);

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenModalDeleteWishlist = (wishlistId) => {
    setSelectedWishlistId(wishlistId);
    setDeleteWishlistModalOpen(true);
  };

  const handleCloseModalDeleteWishlist = () => {
    setDeleteWishlistModalOpen(false);
  };

  const handleOpenModalDeleteAllWishlist = () => {
    setDeleteAllWishlistModalOpen(true);
  };

  const handleCloseModalDeleteAllWishlist = () => {
    setDeleteAllWishlistModalOpen(false);
  };

  const fetchData = () => {
    const userId = localStorage.getItem('userId');
    fetchWishlist(userId)
      .then((response) => {
        setTalentData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeeDetail = (talentId) => {
    navigate('/detail/' + talentId);
  };

  const handleRemoveWishlist = (wishlistId) => {
    const userId = localStorage.getItem('userId');
    removeWishlist(userId, wishlistId)
      .then((response) => {
        console.log('Data wishlist berhasil dihapus:', response.data);
        fetchData();
        setAlertOpen(true);
        setAlertMessage('Wishlist removed successfully!');
        setAlertSeverity('success');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        setAlertOpen(true);
        setAlertMessage('An error occurred during remove wishlist operation.');
        setAlertSeverity('error');
      });
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

  const handleRemoveAllWishlist = () => {
    const userId = localStorage.getItem('userId');
    removeAllWishlist(userId)
      .then((response) => {
        console.log('Seluruh data wishlist user ini berhasil di hapus', response.data);

        fetchData();
        setAlertOpen(true);
        setAlertMessage('All wishlist removed successfully!');
        setAlertSeverity('success');
      })
      .catch((error) => {
        console.error('Error deleting all wishlist data from this user:', error);
        setAlertOpen(true);
        setAlertMessage('An error occurred during remove all wishlist operation.');
        setAlertSeverity('error');
      });
  };

  const handleRequestAllWishlist = () => {
    const userId = localStorage.getItem('userId');

    // Filter untuk ambil talent avail saja
    const filteredTalentData = talentData.filter((item) => item.talentAvailability === true);

    // Membuat array wishlistIds dari data yang telah difilter
    const wishlistIds = filteredTalentData.map((item) => ({ wishlistId: item.wishlistId }));
    requestAllWishlist(userId, wishlistIds)
      .then((response) => {
        console.log('Seluruh data wishlist user ini berhasil di request', response.data);
        fetchData();
        handleOpenDialog();
      })
      .catch((error) => {
        console.error('Error request all wishlist data from this user:', error);
      });
  };

  return (
    <div>
      <RequestSuccessModal open={dialogOpen} onClose={handleCloseDialog} />
      <DeleteWishlistModal
        open={deleteWishlistModalOpen}
        onClose={handleCloseModalDeleteWishlist}
        onDelete={() => handleRemoveWishlist(selectedWishlistId)}
        title={'Remove Wishlist'}
        subTitle={'Are you sure you want to remove your whislist?'}
      />

      <DeleteWishlistModal
        open={deleteAllWishlistModalOpen}
        onClose={handleCloseModalDeleteAllWishlist}
        onDelete={handleRemoveAllWishlist}
        title={'Remove All Wishlist'}
        subTitle={'Are you sure you want to remove all your whislist?'}
      />

      <WishlistAlert open={alertOpen} onClose={() => setAlertOpen(false)} str={alertMessage} severity={alertSeverity} />
      <Navbar data-testid="navbar" />

      {talentData.length !== 0 ? (
        <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
          <Container sx={{ my: '3rem' }}>
            <Container sx={{ marginLeft: '50px', marginBottom: '40px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '24px', fontStyle: 'normal' }}>
                My Wishlist
              </Typography>
            </Container>

            <Container>
              <Grid
                container
                sx={{
                  padding: '1rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: { xs: 'space-between', sm: 'flex' },
                  gap: '2rem',
                  boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                }}
              >
                <InfoOutlinedIcon sx={{ color: 'gold', mr: 1, fontSize: '2rem' }} />
                <Typography>Talent yang sudah ot available tidak akan di Request</Typography>
              </Grid>
            </Container>

            {/* <CustomInfoBox>Talent yang dapat di request hanya Talent yang masih available.</CustomInfoBox> */}

            <Container data-testid="content" sx={{ my: '1rem' }}>
              <Grid container sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Grid
                  container
                  sx={{
                    padding: '2rem 5rem 2rem 5rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: { xs: 'space-between', sm: 'flex-end' },
                    gap: '2rem',
                    boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                  }}
                >
                  {talentData.map((talent, index) => (
                    <Grid key={index} container>
                      <Grid container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', flexGrow: '1', width: 'auto' }}>
                        <Grid item>
                          <Avatar src={talent.talentPhotoUrl} sx={{ width: 100, height: 100 }} />
                        </Grid>
                        <Grid item sx={{ mx: '2rem' }}>
                          <Grid container sx={{ mb: '0.2rem', gap: '0.5rem', alignItems: 'center' }}>
                            <Grid item>
                              <Chip
                                label={
                                  <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '10pt' }}>
                                    {talent.talentAvailability}
                                  </Typography>
                                }
                                variant="outlined"
                                size="small"
                                sx={{ color: talent.talentAvailability === true ? 'green' : 'red', padding: 2 }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography fontWeight={'bold'} color="primary" fontSize={'14pt'} sx={{ color: '#2C8AD3', fontFamily: 'Poppins' }}>
                                {talent.talentName}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ mb: '0.75rem', gap: '0.5rem', alignItems: 'center' }}>
                            <Grid item>
                              <Typography variant="body2" sx={{ color: '#848484' }}>
                                {talent.talentExperience} Years of Experience
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Box sx={{ width: '4px', height: '4px', backgroundColor: '#848484', borderRadius: '100%' }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" sx={{ color: '#848484' }}>
                                {talent.talentLevel} Level
                              </Typography>
                            </Grid>
                          </Grid>

                          <Typography fontWeight={'bold'}>Position</Typography>
                          <Grid container>
                            {talent.position.map((position, index) => (
                              <Box sx={{ mr: '0.5rem', backgroundColor: '#E4EEF6', borderRadius: '3px', mb: 1.5 }} width="fit-content" key={index}>
                                <Typography sx={{ p: '2px 5px' }}>{position.positionName}</Typography>
                              </Box>
                            ))}
                          </Grid>

                          <Typography sx={{ mt: '1rem' }} fontWeight={'bold'}>
                            Skill Set
                          </Typography>
                          <Grid container>
                            {talent.skillSet.map((skill, index) => (
                              <Box sx={{ mr: '0.5rem', backgroundColor: '#E4EEF6', borderRadius: '3px', mb: 1.5 }} width="fit-content" key={index}>
                                <Typography sx={{ p: '2px 5px' }}>{skill.skillsetName}</Typography>
                              </Box>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', alignItems: 'center' }}>
                        <Divider orientation="vertical" />
                        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <Button
                            onClick={() => handleSeeDetail(talent.talentId)}
                            startIcon={<KeyboardArrowRightIcon />}
                            sx={{ textTransform: 'none' }}
                          >
                            See Detail
                          </Button>
                          <Button
                            onClick={() => handleDownloadCV(talent.talentId, talent.talentName)}
                            startIcon={<SimCardDownloadOutlined />}
                            sx={{ color: '#848484', textTransform: 'none' }}
                          >
                            Download CV
                          </Button>
                          <Button
                            // onClick={() => handleRemoveWishlist(talent.wishlistId)}
                            onClick={() => handleOpenModalDeleteWishlist(talent.wishlistId)}
                            startIcon={<DeleteOutlineOutlined />}
                            sx={{ color: 'red', textTransform: 'none' }}
                          >
                            Remove
                          </Button>
                        </Container>
                      </Grid>
                      {index !== talentData.length - 1 && ( // Tampilkan Divider hanya jika bukan data terakhir
                        <Container sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', marginTop: '30px' }}>
                          <Divider sx={{ m: '2', mt: '3' }} />
                        </Container>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>

            <Container>
              <Grid
                container
                sx={{
                  padding: '1rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                  gap: '2rem',
                  boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                }}
              >
                <Grid item>
                  <Button
                    data-testid="remove-all-button"
                    onClick={() => handleOpenModalDeleteAllWishlist()}
                    startIcon={<DeleteOutlineOutlined />}
                    sx={{ color: 'red', textTransform: 'none' }}
                  >
                    Remove All
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    data-testid="request-talent-button"
                    onClick={handleRequestAllWishlist}
                    sx={{ backgroundColor: '#2C8AD3', color: 'white', textTransform: 'none', paddingLeft: '25px', paddingRight: '25px' }}
                  >
                    Request Talent
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Container>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" gap="20px" justifyContent="center" width="100%" style={{ height: '100vh' }}>
          <Box sx={{ width: { xs: '150px', md: '310px' }, md: { xs: '150px', md: '310px' } }}>
            <img src={bg_not_find_data} alt="no find data" style={{ width: '100%', height: 'auto' }} />
          </Box>
          <Typography fontFamily="Poppins" fontSize={{ xs: '1rem', md: '1.5rem' }} color="#848484">
            Your wishlist is currently empty, but don't worry! We're here to help you discover your dream items.
          </Typography>
        </Box>
      )}
    </div>
  );
}
