import React from "react";
import './style.css'

export default function Occupancy(props) {

  const { data } = props;

  return(
    <>
    <section className='occupationDpt'>
             <div className='occupation-1'>
          <div>
            <p>Jenis Pekerjaan</p>
            <p>{data.occupation || '-'}</p>
          </div>
          <div>
            <p>Jabatan</p>
            <p>{data.jobTitle || '-'}</p>
          </div>
         
        </div>
        <div className='occupation-1'>
           <div>
            <p>Nama Perusahaan/Instansi</p>
            <p>{data.officeName || '-'}</p>
          </div>
          <div>
            <p>Alamat Perusahaan/Instansi</p>
            <p>{data.officeAddress || '-'}</p>
          </div>
        </div>

    </section> 

    </>
  )
}