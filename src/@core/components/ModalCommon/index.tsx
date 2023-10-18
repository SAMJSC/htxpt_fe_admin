import Modal from '@mui/material/Modal';
import { ReactNode } from 'react'
import Grid from '@mui/material/Grid'

type ModalProps = {
  open: boolean;
  handleClose: any;
  widthModal?: boolean;
  children: ReactNode;
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #ddd',
  boxShadow: 12,
  p: 4,
};

const ModalCommon = (props: ModalProps) => {
  const { open, handleClose, children, widthModal } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ opacity: widthModal ? 0.95 : 0.5, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <Grid sx={style} style={{ width: widthModal ? 850 : 500 }}>
        {children}
      </Grid>
    </Modal>
  )
}

export default ModalCommon