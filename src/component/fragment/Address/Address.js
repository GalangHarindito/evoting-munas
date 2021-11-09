import React from "react";
import './style.css'

export default function Address(props) {

  const { data } = props;

  return(
    <>
      <section className='addressDpt'>
           <div className='address-1'>
          <div>
            <p>Alamat</p>
            <p>{data.address || '-'}</p>
          </div>
          <div>
            <p>Kecamatan</p>
            <p>{data.kecamatanName || '-'}</p>
          </div>
          <div>
            <p>Kabupaten / Kota</p>
            <p>{data.kabupatenName || '-'}</p>
          </div>
        </div>
        <div className='address-1'>
          <div>
            <p>Provinsi</p>
            <p>{data.propinsiName || '-'}</p>
          </div>
          <div>
            <p>Kode Pos</p>
            <p>{data.kodePos || '-'}</p>
          </div>
        </div>
    </section> 
    </>
   
  )
}