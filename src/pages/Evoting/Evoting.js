import React, { useEffect } from "react";
import './style.css';
import imgVote from '../../assets/img-Evote.svg';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatusVote } from "../../component/elements/headers/action";

export default function Evoting() {
  const dispatch = useDispatch();
  const { datahasVoted, datahasVerified } = useSelector(s => s.header);

  useEffect(() => {
    dispatch(getStatusVote())
  },[]);

  const onTime = () => {
    const d = Date.now();
    const today = new Date(d);
    const date = new Date('Dec 18 2021 03:07 GMT')
    
    if(today.toISOString() > date.toISOString() && datahasVerified){
      return <h4>Test</h4>
    }
    if(today.toISOString() > date.toISOString() && !datahasVerified){
      return <EvoteNotVerified />
    }
    else{
      return <EvoteBefore />
    }
  }
 
  return(
    <section className='evoting'>
      {datahasVoted? <EvoteAfter /> : onTime()}
    </section>
  )
}

function EvoteBefore() {
  return(
    <section className='evoteBefore'>
    <section >
      <img src={imgVote} alt="" />
    </section>
    <section>
      <h4>Sesi E-Voting belum tersedia untuk saat ini </h4>
      <h4>E- Voting Ketua IKATA Periode 2021 - 2025 akan dilaksanakan pada</h4>
      <h4>Hari Jumat 17 Desember 2021 Pukul 00.00 - 23.59 WIB</h4>
    </section>
    </section>
  )
}
  function EvoteAfter() {
    return(
      <section className='evoteAfter'>
      <section >
        <img src={imgVote} alt="" />
      </section>
      <section>
        <h4>Anda telah melakukan E-Voting</h4>
        <h4>Terima kasih atas pertisipasi anda menjadi DPT dan Memlih Ketua IKATA Periode 2021 -2025</h4>
        <h4>Berjumpa kembali di MUNAS IKATA selanjutnya</h4>
      </section>
      </section>
    )
} 

function EvoteNotVerified() {
  return(
    <section className='evoteAfter'>
    <section >
      <img src={imgVote} alt="" />
    </section>
    <section>
      <h4>Akun Anda Belum Terverifikasi</h4>
      <h4>Untuk melakukan E-Voting Silahkan Menghubungi Panitia</h4>
    </section>
    </section>
  )
} 