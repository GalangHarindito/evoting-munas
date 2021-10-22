import React from "react";
import Button from "../../elements/button/Button";
import "./style.css";

export default function EvoteCandidate(props) {
  const { data, openModal, isLoading } = props;
  return (
    <section className='evote-candidate'>
      <h4>Daftar Calon Ketua IKATA 2021 - 2025</h4>
      <p>Silahkan pilih salah satu dari calon Ketua IKATA </p>
      <section>
        {data.length >=1 ?<Cards datas={data} openModal={openModal} isLoading={isLoading} /> : <h2>Belum ada data</h2>}
      </section>
      
    </section>
  );
}

function Cards(props) {
  
  const { datas, openModal, isLoading } = props;

  return(
      <>
        {datas.map((el,idx) => {
          return(
            <section className='cards-candidate' keys={idx}>
            <section>
            <div className='imageCandidate' style={{backgroundImage:`url(${el.biodata.photo})`}} />
            <h5>{el.biodata.number}</h5>
          </section>
          <section>
            <h5>{el.biodata.fullName}</h5>
          </section>
          <section>
            <blockquote>"{el.biodata.jargon || '-'}"</blockquote>
          </section>
          <section>
            <a href={`https://munasikataupn.com/tentangMunas?tab=${el.biodata.fullName.toLowerCase().split(' ').join('')}`} target='_blank'>Tentang Calon Ketua</a>
          </section>
          <section className='buttonVote'>
            <Button label='Pilih' isLoading={isLoading} onClick={() => openModal(el.biodata.fullName, el.id, el.biodata.photo, el.biodata.number)} />
          </section>
          </section>
          )
        })}
        
        
        </>
  )
  
}
