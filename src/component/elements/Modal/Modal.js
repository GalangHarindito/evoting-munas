import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../contexts';
import './style.css';

export default function Modal(props) {
  const { modal, setModal } = useContext(AppContext);
  const { open, className, children, onClose } = props;

  useEffect(() => {
    if (open) {
      setModal(<Content children={children} className={className} />);
    }
    return () => setModal(null);
  }, [open]);

  const [modalContent, setModalContent] = useState(modal);

  useEffect(() => {
    if (modalContent && !modal) {
      onClose();
      setModalContent(modal);
    } else if (!modalContent && modal) {
      setModalContent(modal);
    }
  });

  useEffect(() => {
    if (open) {
      setModal(<Content children={children} className={className} />);
    }
  }, [children, className]);

  return null;
}

export function Content({ className, children }) {
  const customClass = ['modal-global', className].filter(Boolean).join(' ');

  return (
    <section className={customClass}>
      {children}
    </section>
  );
}
