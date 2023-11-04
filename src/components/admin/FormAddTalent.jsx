import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Divider,
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
} from '@mui/material';
import {
  AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon,
  UploadFileOutlined as UploadFileOutlinedIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { addTalent, fetchLevel, fetchPosition, fetchTags, fetchEmployeeStatus, fetchTalentStatus } from 'apis';
import { setDate } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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
};

const fieldContainer = {
  width: '100%',
  padding: '0px 20px 20px 24px',
  display: 'flex',
};

function CustomTextField({ label, id, type }) {
  return (
    <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
      <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>{label}</Typography>
      <TextField id={id} placeholder={`Masukkan ${label}`} variant="outlined" sx={formInput} size="small" type={type} />
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

export default function AddTalentForm({ onCreateTalentSuccess }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const navigateToTalentList = () => {
    navigate('/admin/talent-list');
  };

  // React Quill
  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'link', 'blockquote', 'code'], [{ list: 'bullet' }]],
  };

  const formats = ['bold', 'italic', 'underline', 'link', 'blockquote', 'code', 'bullet'];

  // Form Value
  const [selectedPhoto, setselectedPhoto] = useState('');
  const [selectedPdf, setSelectedPdf] = useState('');
  const [selectedSkillsetIds, setSelectedSkillsetIds] = useState([]);
  const [selectedPositionIds, setSelectedPositionIds] = useState([]);

  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [selectedTalentStatusId, setSelectedTalentStatusId] = useState('');
  const [selectedEmployeeStatusId, setSelectedEmployeeStatusId] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const [skillsetOptions, setSkillsetOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [employeeStatusOptions, setEmployeeStatusOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [talentStatusOptions, setTalentStatusOptions] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDescriptionChange = (html) => {
    setDescription(html);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Image file is too large. Maximum size allowed is 1MB.');
        return;
      }

      setselectedPhoto(file);
    }
  };

  const handleRemoveImage = () => {
    setselectedPhoto(null);
    document.getElementById('photoInput').value = ''; // Reset input file
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      // File melebihi batas ukuran 2MB
      alert('File is too large. Maximum size allowed is 2MB.');
      return;
    }

    setSelectedPdf(file);
  };

  const handleRemovePdf = async () => {
    setSelectedPdf(null);
    document.getElementById('pdfInput').value = ''; // Reset input file
  };

  const fieldIds = ['biography-video-url', 'talent-name', 'nip', 'experience', 'email', 'phone-number', 'total-project'];
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena Januari dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const handleSubmitTalent = async () => {
    const formData = new FormData();

    // Ambil file foto
    const photoInput = document.getElementById('photo-input');
    const photoFile = photoInput.files[0];
    if (photoFile) {
      formData.append('talentPhoto', photoFile, photoFile.name);
    }

    // Ambil file PDF
    const pdfInput = document.getElementById('pdf-input');
    const pdfFile = pdfInput.files[0];
    if (pdfFile) {
      formData.append('cv', pdfFile, pdfFile.name);
    }

    const formattedDate = formatDateToYYYYMMDD(new Date(selectedDate));

    formData.append('biographyVideoUrl', String(document.getElementById('biography-video-url').value));
    formData.append('talentName', String(document.getElementById('talent-name').value));
    formData.append('nip', String(document.getElementById('nip').value));
    formData.append('experience', String(document.getElementById('experience').value));
    formData.append('email', String(document.getElementById('email').value));
    formData.append('cellphone', String(document.getElementById('phone-number').value));
    formData.append('totalProjectCompleted', String(document.getElementById('total-project').value));

    formData.append('sex', String(selectedGender));
    formData.append('dob', String(formattedDate)); // Pastikan 'dob' adalah objek Date yang valid
    formData.append('talentDescription', String(description));
    formData.append('statusId', String(selectedTalentStatusId));
    formData.append('levelId', String(selectedLevelId));
    formData.append('skillIds', String(selectedSkillsetIds.join(',')));
    formData.append('positionIds', String(selectedPositionIds.join(',')));
    formData.append('employeeStatusId', String(selectedEmployeeStatusId));

    try {
      const success = await addTalent(formData);

      if (success) {
        onCreateTalentSuccess();
        resetAllFields();
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetAllFields = () => {
    fieldIds.forEach((fieldId) => {
      document.getElementById(fieldId).value = '';
    });

    setSelectedSkillsetIds([]);
    setSelectedPositionIds([]);
    setSelectedEmployeeStatusId('');
    setSelectedTalentStatusId('');
    setSelectedLevelId([]);

    setDate('');
    setDescription('');

    setselectedPhoto('');
    setSelectedPdf('');

    const photoInput = document.getElementById('photo-input');
    const pdfInput = document.getElementById('pdf-input');
    if (photoInput) {
      photoInput.value = '';
    }
    if (pdfInput) {
      pdfInput.value = '';
    }
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
          marginBottom: '100px',
          justifyContent: { xs: 'space-between', sm: 'flex-start' },
          borderRadius: '10px',
          backgroundColor: 'white',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ margin: '20px', fontSize: '18px', fontWeight: '500', fontFamily: 'Roboto' }}>Tambah Talent</Typography>
        <Divider sx={{ border: '2px solid #F2F6FA' }}></Divider>

        {/* Talent's Photo */}
        <Grid
          container
          sx={{
            width: '100%',
            padding: '15px 20px 20px 24px', //top right bottom left
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Talent's Photo</Typography>
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
              <AddPhotoAlternateOutlinedIcon onClick={() => document.getElementById('photo-input').click()} sx={{ width: '50px', height: '50px' }} />
            )}
          </Paper>
          <input type="file" accept="image/*" id="photo-input" style={{ display: 'none' }} onChange={handleImageChange} />
        </Grid>

        {/* Nama Talent */}
        <CustomTextField label="Nama Talent" id="talent-name" type="text" />

        {/* Nomor Induk Pegawai */}
        <CustomTextField label="Nomor Induk Pegawai" id="nip" type="text" />

        {/* Jenis Kelamin dan Tanggal Lahir */}
        <Grid container sx={{ ...fieldContainer, flexDirection: 'row' }}>
          <Grid
            container
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Jenis Kelamin</Typography>
            <RadioGroup
              value={selectedGender}
              onChange={(event) => setSelectedGender(event.target.value)}
              id="gender"
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel value="L" control={<Radio />} label="Laki-laki" />
              <FormControlLabel value="P" control={<Radio />} label="Perempuan" />
            </RadioGroup>
          </Grid>
          <Grid
            container
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Tanggal Lahir</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dob"
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => <TextField {...params} size="small" />}
                sx={{ '& fieldset': { border: 'none' }, background: '#F2F6FA', borderRadius: '6px' }}
                type="date"
                value={selectedDate}
                onChange={(newDate) => handleDateChange(newDate)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Deskripsi */}
        <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Deskripsi Talent</Typography>

          <ReactQuill theme="snow" modules={modules} formats={formats} id="description" value={description} onChange={handleDescriptionChange} />
        </Grid>

        {/* Upload CV */}
        <Grid container sx={{ ...fieldContainer, flexDirection: 'column' }}>
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

        {/* Tahun Pengalaman dan Talent's Level */}
        <Grid container sx={{ ...fieldContainer, flexDirection: 'row' }}>
          <Grid
            container
            sx={{
              width: '50%',
              paddingRight: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Pengalaman</Typography>
            <TextField id="experience" placeholder="Masukkan Tahun Pengalaman" variant="outlined" sx={formInput} size="small" type="number" />
          </Grid>
          <Grid
            container
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Level</Typography>
            <Select
              id="level-id"
              displayEmpty
              sx={formInput}
              size="small"
              value={selectedLevelId}
              onChange={(event) => setSelectedLevelId(event.target.value)}
            >
              {levelOptions.map((option) => (
                <MenuItem key={option.talentLevelId} value={option.talentLevelId}>
                  {option.talentLevelName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* Skillset */}
        <Grid container sx={{ ...fieldContainer, flexDirection: 'row' }}>
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
        <Grid container sx={{ ...fieldContainer, flexDirection: 'row' }}>
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

        {/* Email */}
        <CustomTextField label="Email" id="email" type="email" />

        {/* No. HP/WA */}
        <CustomTextField label="No. Hp / Whatsapp" id="phone-number" type="tel" />

        {/* Status Kepegawaian & Talent Status*/}
        <Grid container sx={{ ...fieldContainer, flexDirection: 'row' }}>
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
            <Select
              id="employee-status-id"
              displayEmpty
              sx={formInput}
              size="small"
              value={selectedEmployeeStatusId}
              onChange={(event) => setSelectedEmployeeStatusId(event.target.value)}
            >
              {employeeStatusOptions.map((option) => (
                <MenuItem key={option.employeeStatusId} value={option.employeeStatusId}>
                  {option.employeeStatusName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid
            container
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Roboto' }}>Talent Status</Typography>

            <Select
              id="status-id"
              displayEmpty
              sx={formInput}
              size="small"
              value={selectedTalentStatusId}
              onChange={(event) => setSelectedTalentStatusId(event.target.value)}
            >
              {talentStatusOptions.map((option) => (
                <MenuItem key={option.talentStatusId} value={option.talentStatusId}>
                  {option.talentStatusName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* Biografi */}
        <CustomTextField label="Biografi Video" id="biography-video-url" type="url" />

        {/* Total Project */}
        <CustomTextField label="Total Project Selesai" id="total-project" type="number" />

        <Grid container sx={{ ...fieldContainer, flexDirection: 'row', justifyContent: 'end' }}>
          <Button sx={{ marginRight: '20px', textTransform: 'none' }} variant="contained" disableElevation disabled onClick={navigateToTalentList}>
            Batal
          </Button>
          <Button sx={{ textTransform: 'none' }} variant="contained" disableElevation onClick={handleSubmitTalent}>
            Simpan
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
