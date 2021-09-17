import React, { useState } from 'react';
import { getUserData } from '../../../utils/storage';
import './style.css'
import icVerified from '../../../assets/ic-verified.svg';
import icUnverified from '../../../assets/ic-unverified.svg';

export default function Headers() {
  const [dataUser] = useState(getUserData);
  const hasVerified = false;

  return(
    <section className='header'>
      <section className='header-1'>
      <h4>
        Halo, {dataUser.fullName}
      </h4>
      {
         <section className={hasVerified?'verified-status' : 'not-verified-status'} >
          <img src={hasVerified? icVerified : icUnverified } alt="" />
          <p>{hasVerified? 'Terverifikasi' : 'Belum Terverifikasi'}</p>
         </section>
      }
      </section>
      <p>Selamat datang di E-Voting Munas IKATA UPN</p>
    </section>
  )
}