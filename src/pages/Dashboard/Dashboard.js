import React from "react";
import './style.css'
import imgPoster1 from '../../assets/poster-mobile.jpg';
import imgPoster2 from '../../assets/poster-desktop.jpg';

export default function Dashboard() {

  const poster = [ imgPoster1, imgPoster2 ]

  return(
    <section className='dashboard'>
      <section>
      <a href={`${poster[0]}`} download><img src={`${poster[0]}`} alt={`${poster[0]}`} download /></a>
      </section>
      <section>
      <a href={`${poster[1]}`} download><img src={`${poster[1]}`} alt={`${poster[0]}`} download /></a>
      </section>
    </section>
  )
}