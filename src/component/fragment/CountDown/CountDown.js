import React, { useState, useEffect } from "react";
import "./style.css";

export default function CountDown(props) {
  const {time, use} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => { 
      clearTimeout(timer)
    };
  });

  const calculateTimeLeft = () => {
    //let year = new Date().getFullYear();
    let difference = +`${Number(time)}` - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)) || '0',
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24) || '0',
        Menit: Math.floor((difference / 1000 / 60) % 60) || '0',
        Detik: Math.floor((difference / 1000) % 60) || '0',
      }
    }else{
      timeLeft = {
        Hari: '0',
        Jam: '0',
        Menit: '0',
        Detik: '0',
      }
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerComponents = [];

 
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <section className='countdown'>
    {timerComponents.length && use === 'time' ? <div>
      <p>Hitung mundur E-Voting</p> <p>{timerComponents}</p>
    </div> : <div>
      <p>Sisa Waktu E-Voting</p> <p>{timerComponents}</p>
    </div>}
    </section>
  );
}
