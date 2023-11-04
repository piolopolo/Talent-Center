import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, IconButton, Pagination } from '@mui/material';
import { VisibilityRounded, BorderColorRounded } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  fetchTalentsWithPagination, // Import metode baru
} from 'apis';

BasicTable.propTypes = {
  sortBy: PropTypes.string.isRequired, // Sesuaikan tipe data dengan kebutuhan Anda
};

const tableHeadStyle = {
  color: '#7D8FA9',
  fontSize: 12,
  fontFamily: 'Roboto',
  fontWeight: '500',
  wordWrap: 'break-word',
  lineHeight: '1', // Adjust line height to match the reduced cell height
};

const tableCellStyle = {
  color: '#3B4758',
  fontSize: 14,
  fontFamily: 'Roboto',
  fontWeight: '400',
  wordWrap: 'break-word',
};

function StatusBadge({ text, backgroundColor }) {
  const statusStyle = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    background: backgroundColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    display: 'inline-flex',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    wordWrap: 'break-word',
  };

  return (
    <Typography variant="caption" style={statusStyle}>
      {text}
    </Typography>
  );
}

const EntriesToggleButtonGroup = ({ value, onChange }) => {
  const entries = [10, 20, 50];

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label="entries per page">
      {entries.map((entry) => (
        <ToggleButton
          key={entry}
          value={entry}
          sx={{
            borderRadius: 1,
            overflow: 'hidden',
            border: 'none',
            marginLeft: '5px',
            marginRight: '5px',
            backgroundColor: value === entry ? '#2C8AD3' : 'transparent', // Warna latar belakang ketika dipilih atau tidak
            color: value === entry ? 'white' : '#848484', // Warna teks ketika dipilih atau tidak
          }}
        >
          <Typography
            style={{
              color: value === entry ? 'white' : '#848484',
              fontSize: 14,
              fontFamily: 'Inter',
              fontWeight: '500',
              wordWrap: 'break-word',
            }}
          >
            {entry}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default function BasicTable({ sortBy, talentNameSearched }) {
  const { t } = useTranslation();

  const [rows, setRows] = React.useState([]);
  const [entriesPerPage, setEntriesPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0); // Total halaman

  const navigate = useNavigate();

  const handleEntriesPerPageChange = (event) => {
    console.log('New Entries Per Page:', event.target.value);
    setEntriesPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newpage) => {
    setCurrentPage(newpage);
  };

  React.useEffect(() => {
    const fetchData = () => {
      const filterParam = {
        talentName: talentNameSearched,
        levelIds: [],
        skillIds: [],
        positionIds: [],
        experienceYear: [],
      };

      fetchTalentsWithPagination(currentPage, entriesPerPage, sortBy, filterParam)
        .then((response) => {
          const formattedData = response.data.content.map((item) => {
            const date = new Date(item.requestDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            return {
              ...item,
              formattedRequestDate: formattedDate,
            };
          });

          setRows(formattedData);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, [currentPage, entriesPerPage, sortBy, talentNameSearched]);

  return (
    <React.Fragment>
      {/* <Paper> */}
      <TableContainer style={{ backgroundColor: 'white', borderRadius: 8 }}>
        <Table sx={{ idth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ ...tableHeadStyle, minWidth: '150px', fontSize: 12 }}>{t('admin.talentList.tabelHead1')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentList.tabelHead2')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentList.tabelHead3')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentList.tabelHead4')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentList.tabelHead5')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentList.tabelHead6')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row, index) => ( */}
            {rows.map((row, index) => (
              <TableRow key={row.talentApprovalId}>
                <TableCell style={tableCellStyle}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt={row.talentName} src={row.talentPhotoUrl} style={{ marginRight: '4px' }} />
                    {row.talentName}
                  </Stack>
                </TableCell>
                <TableCell style={tableCellStyle}>{row.talentLevel}</TableCell>
                <TableCell style={tableCellStyle}>{row.talentExperience + ' ' + t('admin.talentList.talentYearLabel')} </TableCell>
                <TableCell style={tableCellStyle}>
                  <StatusBadge
                    text={row.talentStatus}
                    backgroundColor={row.talentStatus === 'Onsite' ? '#586A84' : '#DBDBDB'}
                    textColor={row.talentStatus === 'Onsite' ? '#FFFFFF' : '#586A84'}
                  />
                </TableCell>
                <TableCell style={tableCellStyle}>
                  <StatusBadge text={row.employeeStatus} backgroundColor={row.employeeStatus === 'Active' ? '#30A952' : '#CF1D1D'} />
                </TableCell>

                <TableCell style={tableCellStyle}>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      edge="start"
                      onClick={() => navigate('/admin/detail-talent/' + row.talentId)}
                      style={{
                        height: '100%',
                        borderRadius: 4,
                      }}
                    >
                      <VisibilityRounded style={{ color: '#3B4758' }} />
                    </IconButton>

                    <IconButton
                      edge="start"
                      onClick={() => navigate('/admin/edit-talent/' + row.talentId)}
                      style={{
                        height: '100%',
                        borderRadius: 4,
                      }}
                    >
                      <BorderColorRounded style={{ color: '#2C8AD3' }} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" spacing={2} justifyContent="space-between" style={{ margin: '10px' }} alignItems="center">
          <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
            <Typography variant="body1" style={{ color: '#212121', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>
              Entries
            </Typography>
            {/* <TablePageEntries></TablePageEntries> */}
            <EntriesToggleButtonGroup value={entriesPerPage} onChange={handleEntriesPerPageChange} />
          </Stack>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, newPage) => {
              handlePageChange(newPage); // Panggil fungsi handlePageChange dengan halaman baru
            }}
          ></Pagination>{' '}
        </Stack>
      </TableContainer>
    </React.Fragment>
  );
}
