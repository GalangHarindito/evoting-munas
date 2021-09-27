import React, { useEffect, useState } from "react";
import "./style.css";
import EditBiodataForm from "../../component/form/EditBiodata";
import EditAddress from "../../component/form/EditAlamat";
import EditOccupation from "../../component/form/EditOccupation";
import { getProfile, fetchUpdateBiodata, fetchUpdateAddress, fetchUpdateOccupation, fetchPropinsi, fetchKabupaten, fetchKecamatan } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { capitalizedArray } from "../../utils/format";
import { useLocation, useHistory } from "react-router";
import queryString from "querystring";
import Tabs from "../../component/elements/tabs/Tabs";
import Button from "../../component/elements/button/Button";

export default function EditProfile() {
  const dispatch = useDispatch()
  const history = useHistory();
  const { dataBiodata, dataAccount, dataAddress,dataOccupation, dataPropinsi, dataKabupaten, dataKecamatan, message, isLoadingBiodata, isLoadingAddress, isLoadingOccupation } = useSelector((s) => s.editProfile);
  const { propinsiId, kabupatenId } = dataAddress;
  console.log(dataOccupation)
  const optionAngkatan = [];
  const [size, setSize] = useState(true);

  useEffect(() => {
    dispatch(getProfile())
    dispatch(fetchPropinsi())
  },[])

  useEffect(() => {
    if(propinsiId && kabupatenId){
      dispatch(fetchKabupaten(propinsiId))
      dispatch(fetchKecamatan(kabupatenId))
    }
  },[propinsiId, kabupatenId])

  useEffect(() => {
      if (message === 'Data Biodata berhasil diperbaharui') {
        dispatch(getProfile())
      }
      
  }, [message]);
  

  const data = {
    navItems: [
      { idx: 1, name: "Biodata", value: "biodata" },
      { idx: 2, name: "Alamat", value: "address" },
      { idx: 3, name: "Pekerjaan", value: "occupation" },
    ],
    navValues: ["biodata", "address", "occupation"],
    tabsName: "edit",
  };

  return (
    <>
      <section className='editProfile'>
      <div className='gr-1'>
          <h4>Silakan lengkapi data diri Anda</h4>
          <Button onClick={() => history.push('/profile')} label='Lihat Profile' className='buttonLink' />
        </div>
        <section>
         <Tabs data={data}/> 
        </section>
        
        <section>
       
        <Content />
         </section>

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
      </section>
    </>
  );
}

function Content() {
  const dispatch = useDispatch()
  const { dataBiodata, dataAccount, dataAddress,dataOccupation, dataPropinsi, dataKabupaten, dataKecamatan, message, isLoadingBiodata, isLoadingAddress, isLoadingOccupation } = useSelector((s) => s.editProfile);
  const { search } = useLocation();
  const { edit } = queryString.parse(search.replace("?", ""));
  const [size, setSize] = useState(true);

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
  }
  if (edit === "biodata") {
    return (
      <EditBiodataForm
      onSubmit={(values) => {
        console.log(typeof values.photo)
        const newData = new FormData
        newData.append('fullName', capitalizedArray(values.fullName)) 
        newData.append('email', values.email) 
        newData.append('angkatan', Number(values.angkatan)) 
        newData.append('nim', values.nim) 
        newData.append('phoneNumber', values.phoneNumber) 
        newData.append('gender', values.gender) 
        
          if(typeof values.photo === 'string' ){
            dispatch(fetchUpdateBiodata(newData))
      
          }
          else{
      
             if((Number(values.photo[0].size/1024)) > 1024){
            setSize(true)
            toasterError('Ukuran File Tidak lebih dari 1MB')
          }else{
            newData.append('photo', values.photo[0]) 
            dispatch(fetchUpdateBiodata(newData))
        
          }       
          
          }
        
              
      }} 
      data={dataBiodata}
      dataAccount={dataAccount}
      //optionAngkatan={optionAngkatan}
      optionGender={optionGender}
      isLoading={isLoadingBiodata}
      />
    );
  }
  if (edit === "address") {
    return (
      <EditAddress 
data={dataAddress}
onSubmit={ values => {
const newDataAddress = {}
newDataAddress['address'] = values.address
newDataAddress['propinsiId'] = values.propinsiId
newDataAddress['kabupatenId'] = values.kabupatenId
newDataAddress['kecamatanId'] = values.kecamatanId
newDataAddress['kodePos'] = values.kodePos
dispatch(fetchUpdateAddress(newDataAddress))
}}
isLoading={isLoadingAddress}
dataPropinsi = {dataPropinsi}
fetch1={id => dispatch(fetchKabupaten(id))}
fetch2={id => dispatch(fetchKecamatan(id))}
dataKabupaten = {dataKabupaten}    
dataKecamatan = {dataKecamatan}    
/>
    );
  }
  if (edit === "occupation") {
    return (
      <EditOccupation 
data={dataOccupation}
optionOccupation = {optionOccupation}
onSubmit={ values => {
const newDataOccupation = {}
newDataOccupation['occupation'] = values.occupation
newDataOccupation['officeName'] = values.officeName
newDataOccupation['jobTitle'] = values.jobTitle
newDataOccupation['officeAddress'] = values.officeAddress
dispatch(fetchUpdateOccupation(newDataOccupation))
}}
isLoading={isLoadingOccupation}
/>
    );
  }
  return (
    <EditBiodataForm
    onSubmit={(values) => {
      
      //const phone = `${values.countryCode}${inputPhone(values.phoneNumber)}`
      console.log(typeof values.photo)
      const newData = new FormData
      newData.append('fullName', capitalizedArray(values.fullName)) 
      newData.append('email', values.email) 
      newData.append('angkatan', Number(values.angkatan)) 
      newData.append('nim', values.nim) 
      newData.append('phoneNumber', values.phoneNumber) 
      newData.append('gender', values.gender) 
      
        if(typeof values.photo === 'string' ){
          dispatch(fetchUpdateBiodata(newData))
    
        }
        else{
    
           if((Number(values.photo[0].size/1024)) > 1024){
          setSize(true)
          toasterError('Ukuran File Tidak lebih dari 1MB')
        }else{
          newData.append('photo', values.photo[0]) 
          dispatch(fetchUpdateBiodata(newData))
      
        }       
        
        }
      
            
    }} 
    data={dataBiodata}
    dataAccount={dataAccount}
    //optionAngkatan={optionAngkatan}
    optionGender={optionGender}
    isLoading={isLoadingBiodata}
    />
  );
}


















