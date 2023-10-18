import { useState } from 'react';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const ShowMessage = (msgType: any, msgContent: any) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false)

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MuiAlert onClose={handleClose} severity={msgType} sx={{ width: '100%' }}>
        {msgContent}
      </MuiAlert>
    </Snackbar>
  )
}
