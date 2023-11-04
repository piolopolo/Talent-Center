import { useState, useEffect } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchTags } from 'apis';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [paperHeight, setPaperHeight] = useState('64px'); // Tinggi awal

  const handleSearch = () => {
    const selectedIds = selectedOptions.map((option) => option.skillsetId);
    sessionStorage.setItem('selectedSkillsetIds', JSON.stringify(selectedIds));
    navigate('/main');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTags(inputValue);
        setList(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [inputValue]);

  useEffect(() => {
    const calculatePaperHeight = () => {
      const baseHeight = 64; // Tinggi awal
      const increment = 48; // Kenaikan tinggi per 8 item tambahan

      // Hitung berapa kelipatan 8 dari selectedOptions.length
      const multipleOfEight = Math.floor(selectedOptions.length / 8);

      // Hitung tinggi berdasarkan kelipatan
      const height = baseHeight + multipleOfEight * increment;

      return `${height}px`;
    };

    const height = calculatePaperHeight();
    setPaperHeight(height);
  }, [selectedOptions]);

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '884px',
        height: paperHeight,
        backgroundColor: 'white',
        borderRadius: '50px',
        '@media (max-width: 600px)': {
          width: '328px',
          height: paperHeight,
          borderRadius: '36px',
        },
      }}
    >
      <Autocomplete
        multiple
        inputValue={inputValue}
        data-testid="search-bar-element"
        id="tags-standard"
        options={list}
        getOptionLabel={(option) => option.skillsetName}
        onChange={(event, newValue) => {
          setSelectedOptions(newValue); // Mengatur nilai terpilih saat opsi dipilih atau dihapus
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setSelectedOptions([]); // Mengatur nilai terpilih menjadi kosong saat input berubah
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
            variant="standard"
            placeholder={selectedOptions.length === 0 ? 'Try "JavaScript"' : ''}
            sx={{
              width: '790px',
              ml: 4,
              flex: 1,
              color: 'black',
              '& .MuiAutocomplete-endAdornment': {
                display: 'none', // Hide the dropdown icon
              },
              '@media (max-width: 600px)': {
                width: '245px',
              },
            }}
          />
        )}
        // PaperComponent={({ children }) => (
        //   <Paper elevation={3} sx={{ backgroundColor: 'white', color: 'black' }}>
        //     {children}
        //   </Paper>
        // )}
      />
      <IconButton type="button" sx={{ mr: 3, color: '#C4C4C4' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchComponent;
