import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { addTalent, fetchLevel, fetchPosition, fetchTags, fetchEmployeeStatus, fetchTalentStatus } from 'apis';

const formInput = {
  '& fieldset': { border: 'none' },
  background: '#F2F6FA',
  borderRadius: '6px',
  borderWidth: '0px',
  borderColor: 'transparent',
  fontSize: '14px',
  fontFamily: 'Roboto',
  fontWeight: '400',
};

const paperStyle = {
  borderRadius: '10px',
  border: '1.5px dashed',
  textAlign: 'center',
  width: '100px',
  height: '100px',
  borderColor: '#2C8AD3',
  background: '#F2F6FA',
  color: '#2C8AD3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginBottom: '10px',
};

const fieldContainer = {
  width: '50%',
  padding: '0px 24px 0px 0px',
  display: 'flex',
};

const boxStyle = {
  padding: '16px 24px 16px 24px',
  height: '95px',
  justifyContent: 'space-between',
  borderRadius: '12px',
  background: '#E4EEF6',
  boxShadow: '0px 4px 20px 0px rgba(170, 169, 184, 0.10)',
};

function CustomTextField({ label, id, value }) {
  return (
    <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
      <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>{label}</Typography>
      <TextField
        id={id}
        placeholder={`Masukkan ${label}`}
        variant="outlined"
        sx={formInput}
        size="small"
        value={value} // Menentukan nilai default
      />
    </Grid>
  );
}

function CustomCheckboxGroup({ options, idKey, nameKey, selectedIds, setSelectedIds }) {
  const handleCheckboxChange = (option) => {
    if (selectedIds.includes(option[idKey])) {
      setSelectedIds(selectedIds.filter((id) => id !== option[idKey]));
    } else {
      setSelectedIds([...selectedIds, option[idKey]]);
    }
  };

  return (
    <Grid
      container
      sx={{
        padding: '0px 20px 0px 0px',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option[idKey]}
          control={<Checkbox onChange={() => handleCheckboxChange(option)} checked={selectedIds.includes(option[idKey])} />}
          label={option[nameKey]}
        />
      ))}
    </Grid>
  );
}

function CustomBoxStatistik({ label, value }) {
  return (
    <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
      <Box sx={{ ...boxStyle }}>
        <Grid
          container
          sx={{
            width: '100%',
            //top right bottom left
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Grid
            container
            sx={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', color: '#586A84', marginBottom: '8px' }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: '20px', fontWeight: '700', fontFamily: 'Poppins', color: '#3B4758' }}>{value}</Typography>
          </Grid>
          <Grid
            container
            sx={{
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'end',
            }}
          >
            <Box
              sx={{
                borderRadius: '20px',
                height: '40px',
                width: '40px',
                backgroundColor: '#FFE59A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MarkEmailUnreadRoundedIcon sx={{ color: '#FBBC04' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default function EditTalentForm() {
  const { t } = useTranslation();

  const [value, setValue] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  // React Quill
  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'link', 'blockquote', 'code'], [{ list: 'bullet' }]],
  };

  const formats = ['bold', 'italic', 'underline', 'link', 'blockquote', 'code', 'bullet'];

  // Form Value
  const [description, setDescription] = useState('');

  const [selectedSkillsetIds, setSelectedSkillsetIds] = useState([]);
  const [selectedPositionIds, setSelectedPositionIds] = useState([]);

  const [selectedPhoto, setselectedPhoto] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const [skillsetOptions, setSkillsetOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [employeeStatusOptions, setEmployeeStatusOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [talentStatusOptions, setTalentStatusOptions] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Lakukan sesuatu dengan file yang dipilih (misalnya, tampilkan pratinjau gambar)
      setselectedPhoto(file);
    }
  };

  const handleRemoveImage = () => {
    setselectedPhoto(null);
    document.getElementById('photo-input').value = ''; // Reset input file
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
    }
  };

  const handleRemovePdf = () => {
    setSelectedPdf(null);
    document.getElementById('pdf-input').value = ''; // Reset input file
  };

  useEffect(() => {
    fetchLevel()
      .then((response) => setLevelOptions(response.data))
      .catch((error) => console.error('Error fetching data:', error));

    fetchPosition()
      .then((response) => setPositionOptions(response.data))
      .catch((error) => console.error('Error fetching data:', error));

    fetchTags('')
      .then((response) => setSkillsetOptions(response))
      .catch((error) => console.error('Error fetching data:', error));

    fetchEmployeeStatus()
      .then((response) => setEmployeeStatusOptions(response.data))
      .catch((error) => console.error('Error fetching data:', error));

    fetchTalentStatus()
      .then((response) => setTalentStatusOptions(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
        <Typography sx={{ margin: '20px', fontSize: '18px', fontWeight: '500', fontFamily: 'Roboto' }}>Edit Talent</Typography>
        <Divider sx={{ border: '2px solid #F2F6FA' }}></Divider>
        <Grid
          container
          sx={{
            width: '100%',
            padding: '24px 0px 24px 24px', //top right bottom left
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
            <Paper variant="outlined" sx={{ ...paperStyle, width: '100px', height: '100px' }}>
              {selectedPhoto ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: 'rgba(253, 253, 253, 0.8)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={handleRemoveImage}
                  >
                    <DeleteIcon sx={{ fontSize: '24px', color: '#CF1D1D' }} />
                  </div>
                </div>
              ) : (
                <AddPhotoAlternateOutlinedIcon
                  onClick={() => document.getElementById('photo-input').click()}
                  sx={{ width: '50px', height: '50px' }}
                />
              )}
            </Paper>
            <input type="file" accept="image/*" id="photo-input" style={{ display: 'none' }} onChange={handleImageChange} />
            <Button sx={{ textTransform: 'none' }} variant="contained" disableElevation>
              Upload New Photo
            </Button>
          </Grid>
          <Grid
            container
            sx={{
              width: '70%',
              padding: '0px 0px 0px 40px', //top right bottom left
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {' '}
            <Stack spacing={1}>
              <Stack direction="row" spacing={2}>
                <Typography sx={{ fontSize: '24px', fontWeight: '700', fontFamily: 'Roboto' }}>Brad Pitt</Typography>
                <Chip label="Active" color="success" />
                <Chip label="On Site" color="default" />
              </Stack>
            </Stack>
            <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto', marginTop: '20px' }}>
              I am an experienced React | Vue developer, looking for exciting projects and new opportunities.
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto' }}>
              Expert Web Front End Developer ready to take on your project.
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto' }}>
              You deserve a website that is built with security, resposiveness, functionality, and efficiency in mind.
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              width: 'fit-content',
              padding: '0px 0px 0px 45px', //top right bottom left
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'right',
            }}
          ></Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                padding: '0px 24px 0px 24px',
                boxShadow: '0px 8px 20px 0px rgba(170, 169, 184, 0.10)',
                borderRadius: '12px',
              }}
            >
              <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                <Tab sx={{ textTransform: 'none' }} label="Profile" value="1" />
                <Tab sx={{ textTransform: 'none' }} label="Statistik" value="2" />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: '24px 0px 20px 24px' }} value="1">
              <Grid
                container
                sx={{
                  width: '100%',
                  padding: '0px',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {/* Nama Talent */}
                <CustomTextField label="Nama Talent" id="talent_name" />

                {/* Nomor Induk Pegawai */}
                <CustomTextField label="Nomor Induk Pegawai" id="nip" />

                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '20px 0px 20px 0px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Grid
                    container
                    sx={{
                      width: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Jenis Kelamin</Typography>
                    <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                      <FormControlLabel value="male" control={<Radio />} label="Laki-laki" />
                      <FormControlLabel value="female" control={<Radio />} label="Perempuan" />
                    </RadioGroup>
                  </Grid>
                  <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Tanggal Lahir</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} size="small" />}
                        sx={{ '& fieldset': { border: 'none' }, background: '#F2F6FA', borderRadius: '6px' }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '0px 24px 20px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Deskripsi Talent</Typography>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={description}
                    sx={{ borderRadius: '6px', backgroundColor: '#F2F6FA' }}
                  />
                </Grid>
                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '40px 0px 20px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Upload CV</Typography>
                  <Paper variant="outlined" sx={{ ...paperStyle, width: '315px', height: '100px' }}>
                    {selectedPdf ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center', // Membuat ikon dan teks sejajar secara horizontal
                        }}
                      >
                        <Typography sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto' }}>{selectedPdf.name}</Typography>
                        <CloseIcon
                          sx={{
                            fontSize: '24px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            marginLeft: '8px', // Memberikan jarak antara ikon dan teks
                            color: 'rgba(0, 0, 0, 0.54)',
                          }}
                          onClick={handleRemovePdf}
                        />
                      </div>
                    ) : (
                      <div onClick={() => document.getElementById('pdf-input').click()}>
                        <UploadFileOutlinedIcon sx={{ width: '32px', height: '40px' }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto' }}>Drag and drop file here </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto' }}>or click to upload</Typography>
                      </div>
                    )}
                  </Paper>
                  <input type="file" accept=".pdf" id="pdf-input" style={{ display: 'none' }} onChange={handleFileChange} />
                </Grid>
                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '0px 0px 20px 0px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {/* Nomor Induk Pegawai */}
                  <CustomTextField label="Tahun Pengalaman" id="experience-year" />
                  <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Level</Typography>
                    <Select
                      displayEmpty
                      placeholder="Pilih Level"
                      value=""
                      // onChange={handleChange}
                      sx={formInput}
                      size="small"
                    >
                      {levelOptions.map((option) => (
                        <MenuItem key={option.levelId} value={option.levelId}>
                          {option.levelName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '0px 0px 20px 0px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {/* Skillset */}
                  <Grid container sx={{ width: '100%', padding: '0px 20px 20px 24px', display: 'flex' }}>
                    <div>
                      <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto', marginBottom: '10px' }}>Skill Set</Typography>
                      <FormLabel sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto' }}>Pilih lebih dari 1</FormLabel>
                    </div>
                    <CustomCheckboxGroup
                      label="Skill Set"
                      options={skillsetOptions}
                      idKey="skillsetId"
                      nameKey="skillsetName"
                      selectedIds={selectedSkillsetIds}
                      setSelectedIds={setSelectedSkillsetIds}
                    />
                  </Grid>

                  {/* Position */}
                  <Grid container sx={{ width: '100%', padding: '0px 20px 20px 24px', display: 'flex' }}>
                    <div>
                      <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto', marginBottom: '10px' }}>Position</Typography>
                      <FormLabel sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto' }}>Pilih lebih dari 1</FormLabel>
                    </div>
                    <CustomCheckboxGroup
                      label="Position"
                      options={positionOptions}
                      idKey="positionId"
                      nameKey="positionName"
                      selectedIds={selectedPositionIds}
                      setSelectedIds={setSelectedPositionIds}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '0px 0px 20px 0px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {/* Email */}
                  <CustomTextField label="Email" id="email" />
                  {/* No. HP/WA */}
                  <CustomTextField label="No. Hp / Whatsapp" id="phone-number" />{' '}
                </Grid>

                {/* Status Kepegawaian & Talent Status*/}
                <Grid container sx={{ width: '100%', padding: '0px 0px 20px 0px', display: 'flex', flexDirection: 'row' }}>
                  <Grid
                    container
                    sx={{
                      width: '50%',
                      paddingRight: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Status Kepegawaian</Typography>
                    <Select id="employee-status-id" displayEmpty sx={formInput} size="small">
                      {employeeStatusOptions.map((option) => (
                        <MenuItem key={option.employeeStatusId} value={option.employeeStatusName}>
                          {option.employeeStatusName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Talent Status</Typography>

                    <Select id="status-id" displayEmpty sx={formInput} size="small">
                      {talentStatusOptions.map((option) => (
                        <MenuItem key={option.talentStatusId} value={option.talentStatusName}>
                          {option.talentStatusName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                {/* Biography */}
                <CustomTextField label="Biografi Video" id="biografi-video" />
                {/* Total Project */}
                <CustomTextField label="Total Project Selesai" id="total-project" type="number" />
                <Grid
                  container
                  sx={{
                    width: '100%',
                    padding: '20px 24px 20px 0px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                  }}
                >
                  <Button sx={{ marginRight: '20px', textTransform: 'none' }} variant="contained" disableElevation disabled>
                    Batal
                  </Button>
                  <Button sx={{ textTransform: 'none' }} variant="contained" disableElevation>
                    Simpan Perubahan
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ padding: '24px 0px 20px 24px' }} value="2">
              <Grid
                container
                sx={{
                  width: '100%',
                  padding: '0px',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <CustomBoxStatistik label="Total Requested" value="104" />

                <CustomBoxStatistik label="Project Completed" value="45" />
              </Grid>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Container>
  );
}
