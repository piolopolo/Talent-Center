import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useEffect, useState } from 'react';
import i18n from 'i18n';

export default function ComboBoxLang() {
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const updateLang = () => {
      const currentLang = i18n.language;
      setLang(currentLang);
    };
    i18n.on('languageChanged', updateLang);

    return () => {
      i18n.off('languageChanged', updateLang);
    };
  }, []);

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  // Daftar bahasa beserta tautan bendera dan labelnya
  const languages = [
    { code: 'en', flagUrl: 'https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg', label: 'English' },
    { code: 'id', flagUrl: 'https://cdn.countryflags.com/thumbs/indonesia/flag-400.png', label: 'Indonesian' },
  ];

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
        <Select
          disableUnderline={true}
          variant="standard"
          style={{
            color: '#586A84',
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: '400',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'center',
          }}
          value={lang}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownRoundedIcon}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {languages.map((language) => (
            <MenuItem key={language.code} value={language.code} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={language.flagUrl} alt={`${language.label} Flag`} style={{ width: 24, height: 16, marginRight: 8, verticalAlign: 'middle' }} />
              {t(`admin.${language.code}Lang`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}