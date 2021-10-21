import React, { useEffect, useState } from "react";
import './style.css';
import imgVote from '../../assets/img-Evote.svg';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatusVote } from "../../component/elements/headers/action";
import EvoteCandidate from "../../component/fragment/EvoteCandidate";
import { fetchAllCandidate } from './action';
import ModalConfirmation from "../../component/elements/ModalConfirmation";

export default function Evoting() {
  const dispatch = useDispatch();
  const { datahasVoted, datahasVerified } = useSelector(s => s.header);
  const { data } = useSelector(s => s.evoting);
  const [confirmation, setConfirmation] = useState(false);
  const [candidateName, setCandidateName] = useState('')

  useEffect(() => {
    dispatch(getStatusVote())
    dispatch(fetchAllCandidate())
  },[]);

  //useEffect(() => {
  //  if(!datahasVoted && )
  //})
 
  const onTime = () => {
    const d = Date.now();
    const today = new Date(d);
    const date = new Date('Dec 17 2021 02:35 GMT')
    
    if(today.toISOString() > date.toISOString() && datahasVerified){
      return <EvoteCandidate data={data} openModal={(value) => {
        setConfirmation(true)
        setCandidateName(value)
      }} />
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
      <ModalConfirmation
        message={`Apakah Anda yakin memilih ${candidateName.toUpperCase()} sebagai KETUA IKATA PERIODE 2021-2025 ? `}
        onClose={() => setConfirmation(false)}
        open={confirmation}

      />
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
        <h4>Terima kasih atas pertisipasi anda menjadi DPT dan Memilih Ketua IKATA Periode 2021 -2025</h4>
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
      <h4>Untuk melakukan E-Voting Silahkan Masuk Halaman Bantuan</h4>
    </section>
    </section>
  )
} 