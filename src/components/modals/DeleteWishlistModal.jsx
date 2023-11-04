import { Button, Dialog, DialogTitle, DialogActions, Typography, Box } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function DeleteWishlistModal(props) {
  const { open, onClose, onDelete, title, subTitle} = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <Box display="flex" justifyContent="left" alignItems="center" mb={2}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FEE4E2',
                border: '8px #FEF3F2 solid',
                display: 'flex',
                justifyContent: 'center', // Pusatkan secara horizontal
                alignItems: 'center',
              }}
            >
              <DeleteForeverOutlinedIcon fontSize="inherit" style={{ width: 18, height: 20, color: '#D92D20' }} />
            </div>
          </Box>

          <Typography fontSize={'14pt'} textAlign={'left'} fontWeight={'bold'} color={'#848484'} sx={{ fontFamily: 'Inter' }}>
            {title}
          </Typography>
          <Typography fontSize={'10pt'} textAlign={'left'} color={'#475467'} sx={{ fontFamily: 'Inter' }}>
            {subTitle}
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              onClose();
            }}
            style={{
              fontFamily: 'Poppins',
              color: '#344054',
              fontSize: 14,
              background: '#FFFFFF',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
              textTransform: 'none',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              overflow: 'hidden',
              border: '1px #D0D5DD solid',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              onClose();
              //   handleCloseDialogApprove();
              //   handleApprove(selectedRow);
            }}
            color="primary"
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 14,
              background: '#D92D20',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
              textTransform: 'none',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteWishlistModal;
