import React from 'react';
import Button from '../button';
import Modal from '../Modal';
import './style.css';
import icClose from '../../../assets/ic-close.svg';
import iluSuccess from '../../../assets/ilu-success.svg';
import iluError from '../../../assets/ilu-error.svg';
import { Link } from 'react-router-dom';

export default function ModalResponse({ error, open, onClose, message, labelLink, toLink }) {

  return (
    <Modal className='modal-response' onClose={onClose} open={open}>
      <img alt="close" src={icClose} />
      <img alt="" src={error ? iluSuccess : iluError } />
      <div className='modal-response-text'>
        {message.map((el, idx) => {
        return(
          <p key={idx}>{el}</p>
        )
      })}
      </div>
      
      {error ?  
        <Link to={toLink}>{labelLink}</Link> :
        <Button onClick={onClose} label={'Tutup'} /> 
      }
    </Modal>
  );
}

