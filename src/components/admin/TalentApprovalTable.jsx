import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { fetchTalentApprovalsWithPagination, updateTalentApproval } from 'apis';

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

function getColorOfApprovalStatus(status) {
  switch (status) {
    case 'Approved':
      return '#30A952';
    case 'Rejected':
      return '#CF1D1D';
    default:
      return '#586A84';
  }
}

function isDisabled(status) {
  return !!(status === 'Approved' || status === 'Rejected');
}

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

export default function BasicTable({ sortBy, statusApprovalFilter, clientNameSearched, onApprovalSuccess }) {
  const { t } = useTranslation();

  // Dialog / Modal
  const [dialogApproveOpen, setDialogApproveOpen] = React.useState(false);
  const [dialogRejectOpen, setDialogRejectOpen] = React.useState(false);

  // Data
  const [rows, setRows] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);

  // Pagination
  const [entriesPerPage, setEntriesPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0); // Total halaman

  const handleEntriesPerPageChange = (event) => {
    console.log('New Entries Per Page:', event.target.value);
    setEntriesPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newpage) => {
    setCurrentPage(newpage);
  };

  const handleOpenApproveDialog = (row) => {
    setSelectedRow(row);
    setDialogApproveOpen(true);
  };

  const handleApprove = (row) => {
    console.log(selectedRow);

    const reqBody = {
      talentRequestId: row.talentRequestId,
      action: 'approve',
    };
    updateTalentApproval(row.talentRequestId, reqBody).then((response) => {
      console.log(response.status);

      if (response.status === 200) {
        handleCloseDialogApprove();
        fetchData();
        onApprovalSuccess();
      } else {
      }
    });
  };

  const handleReject = (row) => {
    console.log(selectedRow);

    const rejectReason = document.getElementById('reject-reason').value;

    const reqBody = {
      talentRequestId: row.talentRequestId,
      action: 'reject',
      requestRejectReason: rejectReason,
    };
    updateTalentApproval(row.talentRequestId, reqBody).then((response) => {
      console.log(response.status);

      if (response.status === 200) {
        handleCloseDialogApprove();
        fetchData();
        onApprovalSuccess();
      } else {
      }
    });
  };

  const handleOpenRejectDialog = (row) => {
    setSelectedRow(row);
    setDialogRejectOpen(true);
  };

  const handleCloseDialogApprove = () => {
    setDialogApproveOpen(false);
    setSelectedRow(null);
  };

  const handleCloseDialogReject = () => {
    setDialogRejectOpen(false);
    setSelectedRow(null);
  };

  const fetchData = () => {
    fetchTalentApprovalsWithPagination(currentPage, entriesPerPage, sortBy, statusApprovalFilter, clientNameSearched)
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

  React.useEffect(() => {
    fetchData();
  }, [currentPage, entriesPerPage, sortBy, statusApprovalFilter, clientNameSearched]);

  return (
    <React.Fragment>
      {/* <Paper> */}
      <TableContainer style={{ backgroundColor: 'white', borderRadius: 8 }}>
        <Table sx={{ idth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ ...tableHeadStyle, minWidth: '150px', fontSize: 12 }}>{t('admin.talentApproval.tabelHead1')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentApproval.tabelHead2')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentApproval.tabelHead3')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentApproval.tabelHead4')}</TableCell>
              <TableCell style={tableHeadStyle}>{t('admin.talentApproval.tabelHead5')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row, index) => ( */}
            {rows.map((row, index) => (
              <TableRow key={row.talentApprovalId}>
                <TableCell style={tableCellStyle}>{row.agencyName}</TableCell>
                <TableCell style={tableCellStyle}>{row.formattedRequestDate}</TableCell>
                <TableCell style={tableCellStyle}>{row.talentName}</TableCell>
                <TableCell style={tableCellStyle}>
                  <StatusBadge text={row.talentRequestStatusName} backgroundColor={getColorOfApprovalStatus(row.talentRequestStatusName)} />
                </TableCell>

                <TableCell style={tableCellStyle}>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      edge="start"
                      onClick={() => handleOpenApproveDialog(row)}
                      style={{
                        height: '100%',
                        background: '#30A952',
                        borderRadius: 4,
                        opacity: isDisabled(row.talentRequestStatusName) ? 0.5 : 1,
                      }}
                      disabled={isDisabled(row.talentRequestStatusName)}
                    >
                      <CheckIcon style={{ color: 'white' }} />
                    </IconButton>

                    <IconButton
                      edge="start"
                      onClick={() => handleOpenRejectDialog(row)}
                      style={{
                        height: '100%',
                        background: '#CF1D1D',
                        borderRadius: 4,
                        opacity: isDisabled(row.talentRequestStatusName) ? 0.5 : 1,
                      }}
                      disabled={isDisabled(row.talentRequestStatusName)}
                    >
                      <CloseIcon style={{ color: 'white' }} />
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

      <Dialog open={dialogApproveOpen} onClose={handleCloseDialogApprove} style={{ width: '100%' }}>
        {/* <DialogTitle style={{color: '#3B4648', fontSize: '18px', fontFamily: 'Poppins', fontWeight: '600', lineHeight: '22px', wordWrap: 'break-word'}}>{'Approve'}</DialogTitle> */}
        <DialogTitle
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#3B4648',
            fontSize: '18px',
            fontFamily: 'Poppins',
            fontWeight: '600',
            lineHeight: '22px',
            wordWrap: 'break-word',
          }}
        >
          {'Approve'}
          <IconButton edge="end" color="inherit" onClick={handleCloseDialogApprove} aria-label="close" style={{ width: '12px', height: '12px' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            style={{
              width: '100%',
              color: '#555555',
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontWeight: '400',
              lineHeight: '22px',
              wordWrap: 'break-word',
            }}
          >
            Apakah anda yakin ingin approve ini?
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={handleCloseDialogApprove}
            color="primary"
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 14,
              background: '#C4C4C4',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              handleCloseDialogApprove();
              handleApprove(selectedRow);
            }}
            color="primary"
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 14,
              background: '#30A952',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
            }}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogRejectOpen} onClose={handleCloseDialogReject} style={{ width: '100%' }}>
        {/* <DialogTitle style={{color: '#3B4648', fontSize: '18px', fontFamily: 'Poppins', fontWeight: '600', lineHeight: '22px', wordWrap: 'break-word'}}>{'Approve'}</DialogTitle> */}
        <DialogTitle
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#3B4648',
            fontSize: '18px',
            fontFamily: 'Poppins',
            fontWeight: '600',
            lineHeight: '22px',
            wordWrap: 'break-word',
          }}
        >
          {'Reject'}
          <IconButton edge="end" color="inherit" onClick={handleCloseDialogReject} aria-label="close" style={{ width: '12px', height: '12px' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />
        <DialogContent>
          <DialogContentText
            style={{
              width: '100%',
              color: '#555555',
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontWeight: '400',
              lineHeight: '22px',
              wordWrap: 'break-word',
            }}
          >
            Apakah anda yakin ingin reject ini?
          </DialogContentText>
        </DialogContent>
        <TextField
          id="reject-reason"
          placeholder="Masukan alasan penolakan"
          multiline
          rows={2}
          maxRows={4}
          style={{ marginRight: '10px', marginBottom: '10px', marginLeft: '10px', marginTop: '0px' }}
          InputProps={{
            style: { fontSize: '12px' }, // Sesuaikan ukuran teks yang diinginkan
          }}
        />
        <Divider />
        <DialogActions>
          <Button
            onClick={handleCloseDialogReject}
            color="primary"
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 14,
              background: '#C4C4C4',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              handleCloseDialogReject();
              handleReject(selectedRow);
            }}
            color="primary"
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 14,
              background: '#CF1D1D',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
