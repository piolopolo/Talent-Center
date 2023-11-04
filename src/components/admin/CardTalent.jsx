import React, { useState } from 'react';
import { Box, Divider, Grid, Avatar, Typography, Button, Chip, styled } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Stack from '@mui/material/Stack';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchTalentData,  } from 'apis';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#FDFDFD',
    padding: '8px 20px 8px 20px',
    textAlign: 'center',
    borderRadius: '4px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    fontcolor: 'white',
    border: '1px solid #DBDBDB',
}));

const Box1 = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: '#FFFFFF',
}));

const Box2 = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: '#FFFFFF',
    borderRadius: '0px 0px 12px 12px',
    padding: '0',
}));


export default function CardTalent() {
    const { t } = useTranslation();

    const [value, setValue] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="none" sx={{ mb: 4 }}>
            <Grid
                container
                sx={{
                    width: '100%',
                    display: 'flex',
                    marginBottom: '20px',
                    justifyContent: { xs: 'space-between', sm: 'flex-start' },
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    flexDirection: 'column',
                }}
            >
                <Typography sx={{ margin: '20px', fontSize: '18px', fontWeight: '500', fontFamily: 'Roboto' }}>Detail Talent</Typography>
                <Divider sx={{ border: '4px solid #F2F6FA' }} />
                <Grid
                    container
                    sx={{
                        width: '100%',
                        padding: '24px 0px 24px 24px',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Grid
                        container
                        sx={{
                            width: 'fit-content',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Avatar
                            alt="Talent Picture"
                            src={process.env.PUBLIC_URL + '/resource/image/brad.jpg'}
                            sx={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '12px',
                            }}
                        />
                    </Grid>
                    <Grid
                        container md={8}
                        sx={{
                            width: '70%',
                            padding: '0px 0px 0px 40px', //top right bottom left
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Stack spacing={1}>
                            <Stack direction="row" spacing={2}>
                                <Typography sx={{ fontSize: '24px', fontWeight: '700', fontFamily: 'Roboto' }}>Brad Pitt</Typography>
                                <Chip sx={{ height: '27px', px: 1, fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400' }} color='success' label="Active" />
                                <Chip sx={{ height: '27px', px: 1, fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400', color: 'white', backgroundColor: '#586A84' }} label="On Site" />
                            </Stack>
                        </Stack>
                        <Typography sx={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: '400', color: '#586A84', lineHeight: '16.41px' }}>
                            I am an experienced React | Vue developer, looking for exciting
                            projects and new opportunities. Expert Web Front End Developer
                            ready to take on your project. You deserve a website that is built
                            with security, responsiveness, functionality, and efficiency in
                            mind.
                        </Typography>
                    </Grid>
                    <Grid sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button
                            sx={{ textTransform: 'none', }}
                            variant="outlined"
                            startIcon={<BorderColorIcon />}
                            onClick={() => {
                                console.log('Edit');
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Grid item md={12} >
                        <Divider sx={{ border: '1px solid #F2F6FA', margin: '0px 24px' }} />
                    </Grid>
                    <TabContext value={value} padding={0}>
                        <Box sx={{ padding: '0px 24px 0px 24px' }}>
                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                <Tab sx={{ textTransform: 'none' }} label="Profile" value="1" />
                                <Tab sx={{ textTransform: 'none' }} label="Statistik" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" padding={0}>
                            <Box2 padding={0}>
                                <Grid container padding={3}>
                                    <Grid item md={6}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Nama talent</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>Brad Pit</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Jenis Kelamin</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>Laki Laki</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Nomer Induk Pegawai</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>P2012-22</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Tanggal Lahir</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>12/02/01</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box2>
                            <Divider sx={{ border: '4px solid #F2F6FA', }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '0px 0px 12px 12px',
                                }}
                            >
                                <Grid marginTop="4px" container padding={3}>
                                    <Grid item md={12} mb={2}>
                                        <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }} >CV</Typography>
                                    </Grid>
                                    <Grid item md={12} mb={2}>
                                        <Button
                                            sx={{ textTransform: 'none', fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400' }}
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={() => {
                                                console.log('Tombol dengan ikon diklik.');
                                            }}
                                        >
                                            Download CV
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Pengalaman</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>2 Tahun</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }} >Skil Set</Typography>
                                            <Stack direction="row" spacing={2}>
                                                <Item>Java</Item>
                                                <Item>PHP</Item>
                                                <Item>Laravel</Item>
                                                <Item>Front-end</Item>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Level</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>Junior</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider sx={{ border: '4px solid #F2F6FA', }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '0px 0px 12px 12px',
                                }}
                            >
                                <Grid container padding={3}>
                                    <Grid item md={6}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>E-mail</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>BradPit@gmail.com</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>Biografi Video</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>YouTube.com/biograpi</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '13px', fontWeight: '500', color: '#3B4758' }}>No. Hp / Whatsapp</Typography>
                                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: '400', }}>081281092301</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <Box sx={{
                                        borderRadius: '12px',
                                        background: '#E4EEF6',
                                        display: 'flex',
                                        height: '95px',
                                        padding: '16px 24px',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        flex: '1 0 0',
                                        /* shadow */
                                        boxShadow: '0px 4px 20px 0px rgba(170, 169, 184, 0.10)',
                                    }}>
                                        <Stack spacing={4}>
                                            <Typography sx={{ color: '#586A84', fontFamily: 'Poppins', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}>
                                                Total Requested
                                            </Typography>
                                            <Typography sx={{ color: '#3B4758', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 800, lineHeight: '30px' }}>
                                                0
                                            </Typography>
                                        </Stack>
                                        <Avatar alt="Logo Money"
                                            src={process.env.PUBLIC_URL + '/resource/image/Money.png'}
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                                padding: '4px 2px 4px 2px',
                                                borderRadius: '6px',
                                            }} />
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box sx={{
                                        borderRadius: '12px',
                                        background: '#E4EEF6',
                                        display: 'flex',
                                        height: '95px',
                                        padding: '16px 24px',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        flex: '1 0 0',
                                        /* shadow */
                                        boxShadow: '0px 4px 20px 0px rgba(170, 169, 184, 0.10)',
                                    }}>
                                        <Stack spacing={4}>
                                            <Typography sx={{ color: '#586A84', fontFamily: 'Poppins', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}>
                                                Project Completed
                                            </Typography>
                                            <Typography sx={{ color: '#3B4758', fontFamily: 'Poppins', fontSize: '20px', fontWeight: 800, lineHeight: '30px' }}>
                                                0
                                            </Typography>
                                        </Stack>
                                        <Avatar alt="Logo Money"
                                            src={process.env.PUBLIC_URL + '/resource/image/Money.png'}
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                                padding: '4px 2px 4px 2px',
                                                borderRadius: '6px',
                                            }} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </Container>
    );
}
