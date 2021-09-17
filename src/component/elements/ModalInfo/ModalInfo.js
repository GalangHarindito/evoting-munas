import React from 'react';
import Button from '../button';
import Modal from '../Modal';
import './style.css';

export default function ModalInfo({ open, onClose, message }) {

  return (
    <Modal className='modal-info' onClose={onClose} open={open}>
      <div className='modal-info-text'>
        {message.map((el, idx) => {
        return(
          <p key={idx}>{el}</p>
        )
      })}
      </div>
        <Button onClick={onClose} label={'Tutup'} /> 
    </Modal>
  );
}

