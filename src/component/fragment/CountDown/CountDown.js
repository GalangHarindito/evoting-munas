import React, { useState, useEffect } from "react";
import "./style.css";

export default function CountDown() {
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => { 
      clearTimeout(timer)
    };
  });
  const onReload = () => {
    window.location.reload()
  }
  const calculateTimeLeft = () => {
    //let year = new Date().getFullYear();
    let difference = +new Date(`11/11/2021 13:33:00 GMT+0700`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Menit: Math.floor((difference / 1000 / 60) % 60),
        Detik: Math.floor((difference / 1000) % 60),
      };
    }else{
      //onReload()
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
    {timerComponents.length ? <div>
      <p>Hitung mundur E-Voting</p> <p>{timerComponents}</p>
    </div> : ''}
    </section>
  );
}
