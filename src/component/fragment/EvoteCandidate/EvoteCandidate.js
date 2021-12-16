import React from "react";
import Button from "../../elements/button/Button";
import "./style.css";
import { MUNAS_URL } from '../../../utils/fetch';
import { Link } from "react-router-dom";

export default function EvoteCandidate(props) {
  const { data, openModal, isLoading, disabled } = props;
  return (
    <section className='evote-candidate'>
      <h4>Daftar Calon Ketua IKATA 2021 - 2025</h4>
      <div>
      <p>Silahkan pilih salah satu dari calon Ketua IKATA </p>
      <small>Anda merasa kesulitan? silahkan klik <Link to='./bantuan'>Bantuan</Link></small>
      </div>
     
      <br />
      <section>
        {data.length >=1  && <Cards datas={data} openModal={openModal} isLoading={isLoading} disabled={disabled} />}
      </section>
      <br />
    </section>
  );
}

function Cards(props) {
  
  const { datas, openModal, isLoading, disabled } = props;

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
            <a href={`${MUNAS_URL}${el.biodata.fullName.toLowerCase().split(' ').join('')}#candidate`} target='_blank' rel="noreferrer">Tentang Calon Ketua</a>
          </section>
          <section className='buttonVote'>
            <Button label={`Pilih Calon Nomer ${el.biodata.number}`} isLoading={isLoading} disabled={disabled} onClick={() => openModal(el.biodata.fullName, el.id, el.biodata.photo, el.biodata.number)} />
          </section>
          </section>
          )
        })}
        
        
        </>
  )
  
}
