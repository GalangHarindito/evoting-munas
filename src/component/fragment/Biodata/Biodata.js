import React from "react";
import "./style.css";
import noImage from "../../../assets/blank-person.svg";

export default function Biodata(props) {
  const { data, profile } = props;
  console.log(data.photo)
  const { account } = profile;
  const gender = value => {
    switch (value) {
      case 'Male' : return 'Laki - laki';
      case 'Female': return 'Perempuan';
      default : return '';
    }
  };
  const url = !data.photo ? noImage : data.photo

  return (
    <section className='biodataDpt'>
      <div className='profilePicture' style={{backgroundImage:`url(${url})`}}></div>
      <section>
        <div className='biodata-1'>
          <div>
            <p>Nama</p>
            <p>{data.fullName || '-'}</p>
          </div>
          <div>
            <p>Nomer Induk Mahasiswa</p>
            <p>{data.nim || '-'}</p>
          </div>
          <div>
            <p>Nomer Handphone</p>
            <p>{data.phoneNumber}</p>
          </div>
        </div>
        <div className='biodata-1'>
          <div>
            <p>Email</p>
            {account && <p>{account.email}</p>}
          </div>
          <div>
            <p>Angkatan</p>
            <p>{ data.angkatan || '-'}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{ gender(data.gender)}</p>
          </div>
        </div>
      </section>
    </section>
  );
}
