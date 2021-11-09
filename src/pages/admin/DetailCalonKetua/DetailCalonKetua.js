import React, { useEffect, useState } from "react";
import "./style.css";
import CalonKetuaForm from "../../../component/form/CalonKetuaForm";
import { useDispatch } from "react-redux";
import { fetchCandidateId, fetchPropinsi, fetchKabupaten, fetchKecamatan, fetchPostCandidate, fetchEditCandidate } from "./action";
import { useSelector } from "react-redux";
import queryString from "querystring";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { capitalizedArray } from "../../../utils/format";

export default function DetailCalonKetua() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { id } = queryString.parse(search.replace("?", ""));
  const { dataCandidate, dataAddressCandidate, dataPropinsi, dataKabupaten, dataKecamatan, message, isLoadingpostKetua, isLoadingEditKetua } = useSelector(
    (s) => s.detailCalonKetua
  );
  const [size, setSize] = useState(true);
  const { propinsiId, kabupatenId } = dataAddressCandidate;
  //const renderAddress = Object.keys(dataCandidate.address).map(el => el)


  useEffect(() => {
    if(id !== 'create'){
      dispatch(fetchCandidateId(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(fetchPropinsi());
  }, []);

    useEffect(() => {
         if (propinsiId && kabupatenId) {
      dispatch(fetchKabupaten(propinsiId));
      dispatch(fetchKecamatan(kabupatenId));
    }
    
 
  }, [propinsiId, kabupatenId]);


  const optionGender = [
    { label: "Laki-laki", value: "Male" },
    { label: "Perempuan", value: "Female" },
  ];

  const optionOccupation = [
    { text: "ASN", value: "ASN" },
    { text: "BUMN", value: "BUMN" },
    { text: "Swasta", value: "Swasta" },
    { text: "Wiraswasta", value: "Wiraswasta" },
    { text: "Pensiun", value: "Pensiun" },
    { text: "Tidak Bekerja", value: "Tidak Bekerja" },
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

  //const blankDataCandidate = {
  //  biodata: { photo: '', number:'', fullName:'', phoneNumber:'', nim:'', angkatan:'', gender:'', jargon:'', visi:'', misi:'', linkVideo:'', email:''},
  //  occupancy: { occupation: '', jobTitle: '', officeName: '', officeAddress:'' }
  //}

  //const blankAddressCandidate = {
  //  address: '', kabupatenId: '', kecamatanId: '', kodePos: '', propinsiId : ''
  //}

  return(
    <>
     
     <CalonKetuaForm 
      optionGender={optionGender} 
      data={dataCandidate } 
      dataAddressCandidate={dataAddressCandidate}
      optionOccupation={optionOccupation}
      dataPropinsi={dataPropinsi}
      dataKabupaten={dataKabupaten}
      dataKecamatan={dataKecamatan}
      fetch1={(id) => dispatch(fetchKabupaten(id))}
      fetch2={(id) => dispatch(fetchKecamatan(id))}
      isLoadingpostKetua = {id === 'create' ?isLoadingpostKetua : isLoadingEditKetua}
      onSubmit={(values) => {
        const newData = new FormData;
        newData.append("number", Number(values.number) )
        newData.append("fullName", capitalizedArray(values.fullName));
        newData.append("email", values.email);
        newData.append("angkatan", Number(values.angkatan));
        newData.append("nim", values.nim);
        newData.append("phoneNumber", values.phoneNumber);
        newData.append("gender", values.gender);
        newData.append("address", values.address);
        newData.append("propinsiId", values.propinsiId);
        newData.append("kabupatenId", values.kabupatenId);
        newData.append("kecamatanId", values.kecamatanId);
        newData.append("kodePos", values.kodePos);
        newData.append("occupation", values.occupation);
        newData.append("officeName", values.officeName);
        newData.append("jobTitle", values.jobTitle);
        newData.append("officeAddress", values.officeAddress);
        newData.append("jargon", values.jargon);
        newData.append("visi", values.visi);
        newData.append("misi", values.misi);
        newData.append("linkVideo", values.linkVideo);
        newData.append("linkedIn", values.linkedIn);
        newData.append("facebook", values.facebook);
        newData.append("instagram", values.instagram);
        newData.append("description", values.description);
        newData.append("organizationExperience", values.organizationExperience);
      //  for(var pair of newData.entries()) {
      //    console.log(pair[0]+ ', ' + pair[1]); 
      // }
       if (typeof values.photo === "string" || values.photo === null) {
        if(id === 'create'){dispatch(fetchPostCandidate(newData))}
        else{dispatch(fetchEditCandidate(id, newData))}
      } else {
        if (Number(values.photo[0].size / 1024) > 1024) {
          setSize(true);
          toasterError("Ukuran File Tidak lebih dari 1MB");
        } else {
          newData.append("photo", values.photo[0]);
          if(id === 'create'){dispatch(fetchPostCandidate(newData))}
          else{dispatch(fetchEditCandidate(id, newData))}
        }
      }
        //dispatch(fetchPostCandidate(newData));
      }}
      />
 
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
    {message && (
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
        
   </>  
  )
}