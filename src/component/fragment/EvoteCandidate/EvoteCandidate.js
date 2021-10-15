import React from "react";
import Button from "../../elements/button/Button";
import "./style.css";

export default function EvoteCandidate(props) {
  const { data } = props
  return (
    <section className='evote-candidate'>
      <h4>Daftar Calon Ketua IKATA 2021 - 2025</h4>
      <p>Silahkan pilih salah satu dari calon Ketua IKATA </p>
      <section>
        {data.length >=1 ?<Cards datas={data} /> : <h2>Belum ada data</h2>}
      </section>
      
    </section>
  );
}

function Cards(props) {
  
  const { datas } = props;

  return(
      <>
        {datas.map((el,idx) => {
          return(
            <section className='cards-candidate' keys={idx}>
            <section>
            <div className='imageCandidate' style={{backgroundImage:`url(${el.biodata.photo})`}} />
            <p>{el.biodata.number}</p>
          </section>
          <section>
            <h5>{el.biodata.fullName}</h5>
          </section>
          <section>
            <blockquote>"{el.biodata.jargon || '-'}"</blockquote>
          </section>
          <section>
            <a href="">Lihat Detail Calon</a>
          </section>
          <section className='buttonVote'>
            <Button label='Pilih' />
          </section>
          </section>
          )
        })}
        
        
        </>
  )
  
}
