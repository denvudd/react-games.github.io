import { useEffect } from 'react';

import modalCloseIcon from '../../../resources/img/icons/modal-close.svg';

import classes from './Modal.module.scss';

const Modal = (props) => {
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      props.handleClose();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  return (
    <div className={classes.modal}>
      <div className={classes.modalOverlay} onClick={props.handleClose} />
      <button className={classes.modalClose} onClick={props.handleClose}>
        <img src={modalCloseIcon} alt="close modal" className={classes.buttonClose}></img>
      </button>
      <div className={classes.modalContent}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;