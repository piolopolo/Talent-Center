import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Avatar, Chip, Button, Divider, Grid, Container } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, KeyboardArrowRight as KeyboardArrowRightIcon, SimCardDownloadOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { downloadCV } from 'apis';

const AccordionComponent = ({ accordionData }) => {
  const navigate = useNavigate();

  const statusColorMap = {
    1: '#30A952', // Approved
    2: '#CF1D1D', // Rejected
    3: '#F2C103', // On Progress
  };

  const statusStringMap = {
    1: 'Approved', // Approved
    2: 'Rejected', // Rejected
    3: 'On Progress', // On Progress
  };

  const handleSeeDetail = (talentId) => {
    navigate('/detail/' + talentId);
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
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          sx={{ backgroundColor: 'white', boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)', borderRadius: '5px' }}
          defaultExpanded={true}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
            <Typography sx={{ fontWeight: '700', fontFamily: 'Poppins', marginLeft: '20px' }}>{item.talentRequestDate}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container sx={{ my: '1rem' }}>
              {item.talentData.map((talent, talentIndex) => (
                <React.Fragment key={talentIndex} data-testid={'accordion-item-' + talent.talentId}>
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      my: '1.5rem',
                      padding: { xs: '20px 30px', sm: '0px' },
                      flexDirection: { xs: 'column', sm: 'row' },
                      boxShadow: { xs: '0px 5px 20px 0px rgba(0,0,0,0.1)', sm: 'none' },
                      borderRadius: '10px',
                      py: { xs: '1rem', sm: '0' },
                    }}
                  >
                    <Grid
                      container
                      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', flexGrow: '1', width: 'auto' }}
                      key={talentIndex}
                    >
                      <Grid item>
                        <Avatar src={talent.talentPhotoUrl} sx={{ width: 75, height: 75 }} />
                      </Grid>
                      <Grid item sx={{ mx: '2rem' }}>
                        <Grid container sx={{ mb: '0.2rem', gap: '0.5rem', alignItems: 'center' }}>
                          <Grid item>
                            <Chip
                              label={
                                <Typography color="white" sx={{ fontFamily: 'Inter', fontWeight: '700' }}>
                                  {statusStringMap[talent.talentRequestStatusId]}
                                </Typography>
                              }
                              size="small"
                              sx={{
                                backgroundColor: statusColorMap[talent.talentRequestStatusId] || '#848484',
                                padding: 2,
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography fontWeight={'bold'} color="primary" fontSize={'18pt'} sx={{ color: '#2C8AD3', fontFamily: 'Poppins' }}>
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
                          {talent.position.map((positionItem, positionIndex) => (
                            <Box
                              key={positionIndex}
                              sx={{
                                mr: '0.5rem',
                                backgroundColor: '#E4EEF6',
                                borderRadius: '3px',
                                mb: 1.5,
                              }}
                              width="fit-content"
                            >
                              <Typography sx={{ p: '2px 5px' }}>{positionItem.positionName}</Typography>
                            </Box>
                          ))}
                        </Grid>
                        <Typography sx={{ mt: '1rem' }} fontWeight={'bold'}>
                          Skill Set
                        </Typography>
                        <Grid container>
                          {talent.skillSet.map((skillItem, skillIndex) => (
                            <Box
                              key={skillIndex}
                              sx={{
                                mr: '0.5rem',
                                backgroundColor: '#E4EEF6',
                                borderRadius: '3px',
                                mb: 1.5,
                              }}
                              width="fit-content"
                            >
                              <Typography sx={{ p: '2px 5px' }}>{skillItem.skillsetName}</Typography>
                            </Box>
                          ))}
                        </Grid>

                        {/* ... other details */}
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
                      </Container>
                    </Grid>
                  </Grid>
                  {talentIndex !== item.talentData.length - 1 && <Divider sx={{ my: '1rem' }} />}
                </React.Fragment>
              ))}
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionComponent;
