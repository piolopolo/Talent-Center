import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  Typography,
  Box,
  Container,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // Import locale 'id'

import Navbar from 'components/Navbar';
import AccordionComponent from './AccordionComponent'; // Sesuaikan dengan path file AccordionComponent

import { fetchAllRequestData } from 'apis';

const CustomInfoBox = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        padding: '15px 50px',
        mb: 3,
        gap: '20px',
      }}
    >
      <InfoOutlinedIcon sx={{ color: 'gold', mr: 1, fontSize: '2rem' }} />
      <Typography>{children}</Typography>
    </Box>
  );
};

export default function MyRequest() {
  const userId = localStorage.getItem('userId');
  const [value, setValue] = React.useState('1');
  const [allData, setAllData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [onProgressData, setOnProgressData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const transformData = (data) =>
    data.reduce((result, item) => {
      const talentRequestDate = format(new Date(item.talentRequestDate), 'd MMMM yyyy', { locale: id });
      const existingEntry = result.find((entry) => entry.talentRequestDate === talentRequestDate);

      if (existingEntry) {
        existingEntry.talentData.push(item);
      } else {
        result.push({
          talentRequestDate,
          talentData: [item],
        });
      }

      return result;
    }, []);

  const fetchData = async () => {
    try {
      const [all, approved, rejected, onProgress] = await fetchAllRequestData(userId);

      setAllData(all);
      setApprovedData(approved);
      setRejectedData(rejected);
      setOnProgressData(onProgress);

      console.log('masuk');
      console.log(approved);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ my: '3rem' }}>
          <Container sx={{ marginLeft: '50px' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '24px', fontStyle: 'normal' }}>
              My Request
            </Typography>
          </Container>

          <TabContext value={value}>
            <Container>
              <Box sx={{ boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.1)', mt: '2.5rem', mb: '2' }}>
                <TabList onChange={handleChange}>
                  <Tab label="All" value="1" sx={{ textTransform: 'none', width: '25%' }} />
                  <Tab label={'(' + onProgressData.length + ') In Progress'} value="2" sx={{ textTransform: 'none', width: '25%' }} />
                  <Tab label={'(' + approvedData.length + ') Approved'} value="3" sx={{ textTransform: 'none', width: '25%' }} />
                  <Tab label={'(' + rejectedData.length + ') Rejected'} value="4" sx={{ textTransform: 'none', width: '25%' }} />
                </TabList>
              </Box>
            </Container>

            <TabPanel value="1">
              <CustomInfoBox>All requests are checked by Tujuh Sembilan Admin</CustomInfoBox>
              <AccordionComponent accordionData={transformData(allData)} />
            </TabPanel>

            <TabPanel value="2">
              <CustomInfoBox>All requests are checked by Tujuh Sembilan Admin</CustomInfoBox>
              <AccordionComponent accordionData={transformData(onProgressData)} />
            </TabPanel>

            <TabPanel value="3">
              <CustomInfoBox>All requests are checked by Tujuh Sembilan Admin</CustomInfoBox>
              <AccordionComponent accordionData={transformData(approvedData)} />
            </TabPanel>

            <TabPanel value="4">
              <CustomInfoBox>All requests are checked by Tujuh Sembilan Admin</CustomInfoBox>
              <AccordionComponent accordionData={transformData(rejectedData)} />
            </TabPanel>
          </TabContext>
        </Container>
      </Box>
    </div>
  );
}
