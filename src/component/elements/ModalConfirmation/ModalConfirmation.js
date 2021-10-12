import React from 'react';
import Button from '../button';
import Modal from '../Modal';
import './style.css'

export default function ModalConfirmation({ deleted, isLoading, message, send, ...props }) {
  return (
    <Modal className='root-confimation' {...props}>
      {/*<img alt="close" onClick={props.onClose} src="/assets/ic-close.svg" />*/}
      {/*<img alt="" src="/assets/ilu-ask.svg" />*/}
      <p>{message}</p>
      <footer>
        <Button onClick={props.onClose} size="medium" variant="outlined" label={'Batal'} className='outlined'>Batal</Button>
        <Button isLoading={isLoading} onClick={send} size="medium" label={'Yakin'} className={deleted? 'delete':''} >Yakin</Button>
      </footer>
    </Modal>
  );
}
