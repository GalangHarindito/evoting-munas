import React, { useEffect, useState } from 'react';
import './style.css';
import { fetchDPTId, fetchEditDPT } from './action';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from "querystring";
import EditBiodataForm from '../../component/form/EditBiodata';
import Address from '../../component/fragment/Address';
import Occupation from '../../component/fragment/Occupation';
import { capitalizedArray } from '../../utils/format';
import { ToastContainer, toast } from "react-toastify";


export default function DetailDPT() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { id } = queryString.parse(search.replace("?", ""));
  const { dataDPT, isLoading, message, isLoadingEditDPT } = useSelector(s => s.detailDPT)
  const { biodata, account, address, occupancy } = dataDPT;
  useEffect(() => {
    dispatch(fetchDPTId(id))
  },[])
  const [size, setSize] = useState(true);
 const optionGender = [
    { label: "Laki-laki", value: "Male" },
    { label: "Perempuan", value: "Female" },
  ];

  const toasterError = (text) => {
    toast.error(`${text}`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return(
    <section className='detail-dpt'>
      <div>
         <h4>Detail DPT {biodata ? biodata.fullName : '-'} </h4>
      </div>
      <div>
        <h5>Biodata</h5>
        <EditBiodataForm 
         data={biodata?biodata:{}} 
         dataAccount={account?account:{}} 
         optionGender={optionGender}
         isLoading={isLoadingEditDPT}
         onSubmit={(values) => {
          const newData = new FormData();
          newData.append("fullName", capitalizedArray(values.fullName));
          newData.append("email", values.email);
          newData.append("angkatan", Number(values.angkatan));
          newData.append("nim", values.nim);
          newData.append("phoneNumber", values.phoneNumber);
          newData.append("gender", values.gender);

          if (typeof values.photo === "string" || values.photo === null) {
            dispatch(fetchEditDPT(id, newData));
          } else {
            if (Number(values.photo[0].size / 1024) > 1024) {
              setSize(true);
              toasterError("Ukuran File Tidak lebih dari 1MB");
            } else {
              newData.append("photo", values.photo[0]);
              dispatch(fetchEditDPT(id, newData));
            }
          }
        }}

        />
      </div>
      <div>
      <h5>Alamat</h5>
        <Address data={address?address:{}} />
      </div>
      <div>
      <h5>Pekerjaan</h5>
        <Occupation data={occupancy?occupancy:{}} />
      </div>
   
        {size && (
          <ToastContainer
            position='top-center'
            //autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        )}
    </section>
  )
}
