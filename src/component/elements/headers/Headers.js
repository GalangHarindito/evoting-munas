import React, { useEffect, useState } from 'react';
import { getUserData } from '../../../utils/storage';
import './style.css'
import icVerified from '../../../assets/ic-verified.svg';
import icUnverified from '../../../assets/ic-unverified.svg';
import { useSelector, useDispatch  } from 'react-redux';
import { getStatusVote } from './action';
import { capitalizedArray } from '../../../utils/format';

export default function Headers() {
  const dispatch = useDispatch();
  const [dataUser] = useState(getUserData);
  const { datahasVerified } = useSelector(s => s.header)

  useEffect(() => {
    dispatch(getStatusVote())
  },[]);

  const renderDpt = (
    <>
 
    <section className='header-1'>
    
      <h4>
        Halo, {capitalizedArray(dataUser.fullName)}
      </h4>
     
      <section className={datahasVerified ? 'verified-status' : 'not-verified-status'}>
        <img src={datahasVerified ? icVerified : icUnverified} alt="" />
        <p>{datahasVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}</p>
      </section>

      </section>
    <p>Selamat datang di E-Voting Munas IKATA UPN 2021</p></>

  )

  return(
    <section className='header'>
     
     {dataUser.role === 'ROLE_DPT' ? renderDpt : <Admin role={dataUser} />}
    </section>
    
  )
}

function Admin(props) {
  const { role, fullName } = props.role;

  return(
    <>
       <h4>
        Halo, Admin {role === 'ROLE_VERIFIER' ? 'Verifikator' : ''} {fullName ? fullName : ''}
      </h4>
      <p>Selamat Bekerja IKATA TANGGUH!!!</p>
    </>
  )
}