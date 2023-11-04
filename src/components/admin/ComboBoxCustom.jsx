import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function ComboBoxCustom({ selected, onSelectedChange, options }) {
  const handleSortChange = (event) => {
    const newSelected = event.target.value;
    onSelectedChange(newSelected);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <Select value={selected} onChange={handleSortChange} IconComponent={KeyboardArrowDownRoundedIcon} fullWidth sx={{ backgroundColor: 'white' }}>
        {Object.keys(options).map((key) => (
          <MenuItem key={key} value={key}>
            {options[key]}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
