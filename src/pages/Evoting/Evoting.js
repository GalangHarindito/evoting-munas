import React, { useEffect, useState } from "react";
import './style.css';
import imgVote from '../../assets/img-Evote.svg';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatusVote } from "../../component/elements/headers/action";
import EvoteCandidate from "../../component/fragment/EvoteCandidate";
import { fetchAllCandidate, fetchVote, resetMessage } from './action';
import ModalConfirmation from "../../component/elements/ModalConfirmation";
import ModalResponse from "../../component/elements/ModalResponse";
import { useHistory } from "react-router";

export default function Evoting() {
  const dispatch = useDispatch();
  const history = useHistory()
  const { datahasVoted, datahasVerified } = useSelector(s => s.header);
  const { data, isLoadingVote, dataVote, dataStatusVote } = useSelector(s => s.evoting);
  const [confirmation, setConfirmation] = useState(false);
  const [info, setInfo] = useState(false);
  const [successVote, setsuccessVote] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [idCandidate, setCandidateId] = useState('');
  const [photo, setPhoto] = useState('');
  const [number, setNumber] = useState('')
  //const closeModal = () => {
    
  //  //history.push('/bantuan'); 
  //};
  
  useEffect(() => {
    dispatch(getStatusVote())
    dispatch(fetchAllCandidate())
  },[]);
  

  useEffect(() => {
    if(dataStatusVote){
      setConfirmation(false)
      setsuccessVote(true)
      
    }
  },[dataStatusVote])

  useEffect(() => {
    if (!successVote) {
      dispatch(resetMessage('', 'StatusVote'));
    }
  }, [successVote]);


  const vote = () => {
    dispatch(fetchVote(idCandidate))
  }
 
  const onTime = () => {
    const d = Date.now();
    const today = new Date(d);
    const date = new Date('Oct 17 2021 02:35 GMT')
    
    if(today.toISOString() > date.toISOString() && datahasVerified ){
      return <EvoteCandidate data={data} openModal={(value, id, photo, number) => {
        if(datahasVerified && !datahasVoted){
          setConfirmation(true)
        }else if(!datahasVerified || datahasVoted){
          setInfo(true)
        }
        setCandidateName(value)
        setCandidateId(id)
        setPhoto(photo)
        setNumber(number)
      }}
      />
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
      {datahasVoted ? <EvoteAfter /> : onTime()}
      <ModalConfirmation
        photo={photo}
        number={number}
        message={`Apakah Anda yakin memilih ${candidateName.toUpperCase()} sebagai KETUA IKATA PERIODE 2021-2025 ? `}
        onClose={() => setConfirmation(false)}
        isLoading={isLoadingVote}
        open={confirmation}
        send={() => vote()}
      />
      <ModalResponse
        error={false}
        message= {!datahasVerified ? [
          <b>AKUN DPT ANDA BELUM TERVERIFIKASI</b>, 
          'Silahkan Menuju Halaman Bantuan Untuk konfirmasi ke panitia', 
        ] : datahasVoted ? [
          <b>ANDA TELAH MELAKUKAN VOTING</b>, 
          'Mohon maaf Hak voting tiap DPT hanya satu kali',
        ] : []}
        onClose={() => setInfo(false)}
        open={info} 
      />
      <ModalResponse
        error={dataStatusVote === 200? true : false }
        message= {dataStatusVote === 200? [
          <b>E-VOTE BERHASIL</b>, 
          'Terimakasih telah berpartisipasi pada E-voting Pemilihan ketua IKATA UPN periode 2021 - 2025. Berjumpa kembali di MUNAS IKATA periode berikutnya.', 
        ] : [
          <b>E-VOTE GAGAL</b>, 
          'Mohon maaf anda telah menggunakan Hak Pilih Anda dalam Pemilihan Ketua Ikata Periode 2021 - 2025', 
        ]}
        onClose={() => {
          setsuccessVote(false)
          window.location.reload()
        }}
        open={successVote} 
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