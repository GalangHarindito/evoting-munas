import React from "react";
import './style.css'

export default function Occupancy(props) {

  const { data } = props;
  
  const render_noData = (
    <div className='occupationDpt'>
      <h4>Belum Ada Data Pekerjaan</h4>
    </div>
  )

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
            <p>Nama Instansi</p>
            <p>{data.officeName || '-'}</p>
          </div>
          <div>
            <p>Alamat Kantor/Instansi</p>
            <p>{data.officeAddress || '-'}</p>
          </div>
        </div>

    </section> 

    </>
  )
}