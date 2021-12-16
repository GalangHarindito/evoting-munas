import React, { useEffect, useState } from "react";
import "./style.css";
import imgVote from "../../assets/img-Evote.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatusVote } from "../../component/elements/headers/action";
import EvoteCandidate from "../../component/fragment/EvoteCandidate";
import { fetchAllCandidate, fetchVote, resetMessage } from "./action";
import ModalConfirmation from "../../component/elements/ModalConfirmation";
import ModalResponse from "../../component/elements/ModalResponse";
import { time, afterTime } from '../../utils/format';
import { Link } from "react-router-dom";

export default function Evoting() {
  const dispatch = useDispatch();
  const { datahasVoted, datahasVerified, datahasToken } = useSelector(
    (s) => s.header
  );
  const { data, isLoadingVote, dataStatusVote } = useSelector((s) => s.evoting);
  const [confirmation, setConfirmation] = useState(false);
  const [info, setInfo] = useState(false);
  const [successVote, setsuccessVote] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [idCandidate, setCandidateId] = useState("");
  const [photo, setPhoto] = useState("");
  const [number, setNumber] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => {
      clearTimeout(timer);
    };
  });

  const calculateTimeLeft = () => {
    //let year = new Date().getFullYear();
    let difference = +`${Number(time)}` - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Menit: Math.floor((difference / 1000 / 60) % 60),
        Detik: Math.floor((difference / 1000) % 60) || 0,
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (Object.keys(timeLeft).length <= 0) {
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    dispatch(getStatusVote());
    dispatch(fetchAllCandidate());
  }, []);

  useEffect(() => {
    if (dataStatusVote) {
      setConfirmation(false);
      setsuccessVote(true);
    }
  }, [dataStatusVote]);

  useEffect(() => {
    if (!successVote) {
      dispatch(resetMessage("", "StatusVote"));
    }
  }, [successVote]);

  const vote = () => {
    dispatch(fetchVote(idCandidate));
  };

  const today = Math.floor(Date.now() / 1000);
    const afterDate = new Date(`${afterTime}`)
    const onClose = Math.floor(afterDate / 1000);


  const onTime = () => {
    const today = Math.floor(Date.now() / 1000);
    const date = new Date(`${time}`);
    const afterDate = new Date(`${afterTime}`)
    const onVote = Math.floor(date / 1000);
    const onClose = Math.floor(afterDate / 1000);

    if (today > onVote && datahasVerified) {
      return (
        <>
        <EvoteCandidate
          data={data}
          disabled={disabled}
          openModal={(value, id, photo, number) => {
            if (datahasVerified && !datahasVoted) {
              setConfirmation(true);
            } else if (!datahasVerified || datahasVoted) {
              setInfo(true);
            }
            setCandidateName(value);
            setCandidateId(id);
            setPhoto(photo);
            setNumber(number);
          }}
        />
        </>
      );
    }
    if(today > onClose && !datahasVoted ){
      return <EvoteClose />
    }
    if (today > onVote && !datahasVerified) {
      return <EvoteNotVerified />;
    } else {
      return <EvoteBefore data={data} disabled={true} />;
    }
    
  };

  return (
    <section className='evoting'>
      {today > onClose && !datahasVoted ? <EvoteClose /> : datahasVoted ?  <EvoteAfter token={datahasToken} /> : onTime()}
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
        message={
          !datahasVerified
            ? [
                <b>AKUN DPT ANDA BELUM TERVERIFIKASI</b>,
                "Silahkan Menuju Halaman Bantuan Untuk konfirmasi ke panitia",
              ]
            : datahasVoted
            ? [
                <b>ANDA TELAH MELAKUKAN VOTING</b>,
                "Mohon maaf Hak voting tiap DPT hanya satu kali",
              ]
            : []
        }
        onClose={() => setInfo(false)}
        open={info}
      />
      <ModalResponse
        error={dataStatusVote === 200 ? true : false}
        message={
          dataStatusVote === 200
            ? [
                <b>E-VOTE BERHASIL</b>,
                "Terimakasih telah berpartisipasi pada E-voting Pemilihan KETUA IKATA UPN periode 2021 - 2025. Berjumpa kembali di MUNAS IKATA periode berikutnya.",
              ]
            : [
                <b>E-VOTE GAGAL</b>,
                "Mohon maaf anda telah menggunakan Hak Pilih Anda dalam Pemilihan KETUA Ikata Periode 2021 - 2025",
              ]
        }
        onClose={() => {
          setsuccessVote(false);
          window.location.reload();
        }}
        open={successVote}
      />
    </section>
  );
}

function EvoteBefore(props) {
  const { data, disabled } = props;
  return (
    <section className='evoteBefore'>
      {data.length >= 1 ? (
        <section>
          <EvoteCandidate data={data} disabled={disabled} />
        </section>
      ) : (
        <section style={{textAlign:'center'}}>
          <img src={imgVote} alt='img' />
        </section>
      )}
      <br />
      <section>
        <h4>Sesi E-Voting belum tersedia untuk saat ini </h4>
        <h4>
          E- Voting KETUA IKATA Periode 2021 - 2025 akan dilaksanakan pada
        </h4>
        <h4>Hari Jumat 17 Desember 2021 Pukul 00.00 - 16.00 WIB</h4>
      </section>
    </section>
  );
}
function EvoteAfter(props) {
  return (
    <section className='evoteAfter'>
      <section>
        <img src={imgVote} alt='' />
      </section>
      <section>
        <h4>E-Voting Anda Berhasil</h4>
        <h5>
          Kode Pemilihan :{" "}
          <b style={{ color: "var(--primary-color)" }}>{props.token}</b>{" "}
        </h5>
        <h5>
          Pengecekan Kode Pemilihan dapat dilakukan di{" "}
          <Link to='/vote-check'>sini</Link>
        </h5>
        <h6>Yuk, tujukkan kalau anda sudah evote <a href="https://www.twibbonize.com/munasikatake6" target='_blank' rel="noreferrer">https://www.twibbonize.com/munasikatake6</a></h6>
        <h4>
          Terima kasih atas partisipasi anda menjadi DPT dan Memilih KETUA IKATA
          Periode 2021 -2025
        </h4>
        <h4>Berjumpa kembali di MUNAS IKATA selanjutnya</h4>
        <h6>Bila berkenan untuk mengisi user feedback mengenai aplikasi evoting ini. Link <a href="https://bit.ly/3oS28MU" target='_blank' rel="noreferrer">bit.ly/3oS28MU</a></h6>
      </section>
    </section>
  );
}

function EvoteNotVerified() {
  return (
    <section className='evoteAfter'>
      <section>
        <img src={imgVote} alt='' />
      </section>
      <section>
        <h4>Akun Anda Belum Terverifikasi</h4>
        <h4>Untuk melakukan E-Voting Silahkan Masuk Halaman Bantuan</h4>
      </section>
    </section>
  );
}

function EvoteClose() {
  return (
    <section className='evoteAfter'>
      <section>
        <img src={imgVote} alt='' />
      </section>
      <section>
      <h4>
          E-Voting Telah Berakhir
        </h4>
      <h4>
          Terima kasih atas partisipasi anda dalam MUNAS IKATA 2021
        </h4>
        <h4>Berjumpa kembali di MUNAS IKATA selanjutnya</h4>
      </section>
    </section>
  );
}
