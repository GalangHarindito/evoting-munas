import React from 'react';
import caraDaftar from '../../../assets/cara-daftar-dpt.pdf';
import './style.css';

export default function CaraMendaftar({data}) {
  return(
    <section className='pdf'>
      <embed
        src={data}
        alt=''
        type='application/pdf'
        frameBorder='0'
        height='100vh'
        width='100%'
      />
    </section>
    
  )
}