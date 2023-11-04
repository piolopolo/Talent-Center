import { Button, Dialog, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

function RequestSuccessModal(props) {
  const { open, onClose } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <CheckCircleOutlineRoundedIcon sx={{ color: '#30A952', fontSize: '90px', fontWeight: 'light' }} /> {/* Change color and fontSize */}
          </Box>

          <Typography fontSize={'14pt'} textAlign={'center'} fontWeight={'bold'} color={'#848484'}>
            Your Request is in Process!
          </Typography>
          <Typography fontSize={'10pt'} textAlign={'center'} color={'#848484'}>
            You can check your request status at "My Request" menu
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" justifyContent="center">
            {' '}
            <Button
              variant="contained"
              style={{ textTransform: 'capitalize', width: '20%', backgroundColor: '#2C8AD3', color: 'white' }}
              onClick={onClose}
            >
              OK
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RequestSuccessModal;
