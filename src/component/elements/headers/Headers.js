import React, { useEffect, useState } from "react";
import { getUserData } from "../../../utils/storage";
import "./style.css";
import icVerified from "../../../assets/ic-verified.svg";
import icUnverified from "../../../assets/ic-unverified.svg";
import { useSelector, useDispatch } from "react-redux";
import { getStatusVote } from "./action";
import { capitalizedArray } from "../../../utils/format";
import CountDown from "../../fragment/CountDown";
import { time, afterTime } from "../../../utils/format";

export default function Headers() {
  const dispatch = useDispatch();
  const [dataUser] = useState(getUserData);
  const { datahasVerified } = useSelector((s) => s.header);
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    dispatch(getStatusVote());
  }, []);

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

  const renderDpt = (
    <>
      <section className='header-1'>
        <h4>Halo, {capitalizedArray(dataUser.fullName)}</h4>

        <section
          className={
            datahasVerified ? "verified-status" : "not-verified-status"
          }
        >
          <img src={datahasVerified ? icVerified : icUnverified} alt='' />
          <p>{datahasVerified ? "Terverifikasi" : "Belum Terverifikasi"}</p>
        </section>
      </section>
      <p>Selamat datang di E-Voting Munas IKATA UPN 2021</p>
      <section>
        {disabled ?<CountDown time={time} use='time' /> : <CountDown use='timeLeft' time={afterTime} /> }
      </section>
    </>
  );

  return (
    <section className='header'>
      {dataUser.role === "ROLE_DPT" ? renderDpt : <Admin role={dataUser} />}
    </section>
  );
}

function Admin(props) {
  const { role, fullName } = props.role;

  return (
    <>
      <h4>
        Halo, Admin {role === "ROLE_VERIFIER" ? "Verifikator" : ""}{" "}
        {fullName ? fullName : ""}
      </h4>
      <p>Selamat Bekerja IKATA TANGGUH!!!</p>
    </>
  );
}
