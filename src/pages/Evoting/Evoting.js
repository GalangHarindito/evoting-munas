import React, { useEffect } from "react";
import './style.css';
import imgVote from '../../assets/img-Evote.svg';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatusVote } from "../../component/elements/headers/action";

export default function Evoting() {
  const dispatch = useDispatch();
  const { datahasVoted } = useSelector(s => s.header);
  console.log(datahasVoted)

  useEffect(() => {
    dispatch(getStatusVote())
  },[]);

  return(
    <section className='evoting'>
      {datahasVoted? <EvoteAfter /> : <EvoteBefore />}
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
      <h4>Hari Sabtu 18 Desember 2021 Pukul 09.00 - 23.59 WIB</h4>
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