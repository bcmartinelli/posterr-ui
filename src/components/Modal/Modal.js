
import { Modal } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './modal.scss';

const ModalDefault = (props) => {
  return (
    <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={`modal-container ${props.size ?? ''}`}>
          {!props.isProfile ? <button type='button' className='btn-close' onClick={props.onClose}><CloseOutlinedIcon /></button> : null}
          {props.children}
        </div>
      </Modal>
  );
}

export default ModalDefault;
