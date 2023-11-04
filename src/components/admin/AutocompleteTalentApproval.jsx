import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import { fetchAutocompleteClients} from 'apis';

export default function AutocompleteAgencyName(props) {
  const [inputValue, setInputValue] = React.useState('');
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    console.log('input: ' + inputValue)
    const fetchData = async () => {
      try {
        const response = await fetchAutocompleteClients (inputValue);
        setList(response);

        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (inputValue) {
      fetchData();
    } else {
      setList([]);
    }
  }, [inputValue]);

  return (
    <Autocomplete
      sx={{ minWidth: 100 }}
      inputValue={inputValue}
      data-testid="search-bar-element"
      id="tags-standard"
      options={list}
      getOptionLabel={(option) => option.agencyName || ''}
      freeSolo
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search ..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="end">
                <IconButton edge="start" onClick={() => props.onSearch(inputValue)}>
                  <SearchOutlined sx={{ color: '#2C8AD3' }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              width: { xs: '300px', sm: '350px' },
              backgroundColor: 'white',
              borderRadius: '5px',
            },
          }}
          inputProps={{ ...params.inputProps, fontFamily: 'Inter', maxLength: 255}}
          sx={{
            input: { width: '0%', color: 'black', ':focus': { width: '90%' } },
          }}
        />
      )}
    />
  );
}
