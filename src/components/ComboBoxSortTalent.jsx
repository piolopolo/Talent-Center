import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function ComboBoxSortTalent({ selected, onSelectedChange, options }) {
  const handleSortChange = (event) => {
    const newSelected = event.target.value;
    onSelectedChange(newSelected);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Typography
        sx={{
          display: { xs: 'none', sm: 'flex' },
          color: '#212121',
          fontFamily: 'Inter',
          lineHeight: 'normal',
          alignSelf: 'center',
        }}
        variant="body1"
      >
        Sort by
      </Typography>
      <FormControl variant="outlined">
        <Select
          labelId="sort-by-select"
          id="sort-by-select"
          value={selected}
          onChange={handleSortChange}
          label="Sort by"
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderRadius: '8px',
            border: '1px solid var(--grey, #848484)',
            width: { xs: '170px', sm: '300px' },
          }}
        >
          {Object.keys(options).map((key) => (
            <MenuItem key={key} value={key}>
              {options[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default ComboBoxSortTalent;
