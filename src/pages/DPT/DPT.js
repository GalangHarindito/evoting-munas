import React, { useEffect, useState } from "react";
import "./style.css";
import { getAllDPT, fetchDeleteDpt, fetchUpdateVerified, register } from "./action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TableGrid from "../../component/elements/Table";
import ModalConfirmation from "../../component/elements/ModalConfirmation";
import queryString from "querystring";
import moment from "moment";
import Button from "../../component/elements/button/Button";
import SwitchCheck from "../../component/elements/Switch/Switch";
import { angkatanKuliah } from "../../utils/format";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../../component/elements/Pagination/Pagination";
import { capitalizedArray } from "../../utils/format";
import { ToastContainer } from "react-toastify";
import DetailDPT from "../DetailDPT";
import RegisterForm from "../../component/form/registerForm";
//import 'moment/locale/id';

export default function DPT() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const { id } = queryString.parse(location.search.replace("?", ""));
  let { page } = queryString.parse(location.search.replace("?", ""));
  const { angkatan } = queryString.parse(location.search.replace("?", ""));
  const { fullName } = queryString.parse(location.search.replace("?", ""));
  const { createDPT } = queryString.parse(location.search.replace("?", ""));
  const { verify } = queryString.parse(location.search.replace("?", ""));
  const { vote } = queryString.parse(location.search.replace("?", ""));
  const { download } = queryString.parse(location.search.replace("?", ""));
  const {
    data,
    dataMetaDpt,
    dataMesDelete,
    dataMesVerified,
    dataMesRegister,
    dataMesUnVerified,
    message,
    messageVerified,
    isLoading,
    isLoadingRegister,
    isLoadingDelete,
  } = useSelector((s) => s.dpt);
  const [confirmation, setConfirmation] = useState(false);
  const [idDPT, setidDPT] = useState("");
  const [namaDPT, setnamaDPT] = useState("");
  const [downloadAll, setDownloadAll] = useState(false)
  //useEffect(() => {
  //  dispatch(getAllDPT(page));
  //}, []);

  let req = {
    page: parseInt(page) || 1,
    size: 15,
  };

  if (angkatan) {
    let valAngkatan = {};
    valAngkatan["angkatan"] = angkatan;
    req.angkatan = angkatan;
  }

  if (fullName) {
    let valName = {};
    valName["fullName"] = fullName;
    req.fullName = fullName;
  }

  if (verify) {
    let valVerify = {};
    valVerify["verify"] = verify;
    req.verify = verify;
  }

  if (vote) {
    let valVote = {};
    valVote["vote"] = vote;
    req.vote = vote;
  }

  if(download) {
    req.download = download
  }



  useEffect(() => {
    dispatch(getAllDPT(req));

  }, []);

  useEffect(() => {
    dispatch(getAllDPT(req));
  }, [page, angkatan, fullName, verify, vote, download]);

  useEffect(() => {
    if (dataMesDelete === "Berhasil Hapus DPT" || dataMesVerified === 'Berhasil Verifikasi DPT' || dataMesRegister === 'Pendaftaran DPT Berhasil' || dataMesUnVerified === 'Berhasil unveriifed') {
      setConfirmation(false)
      dispatch(getAllDPT(req))
    }
  }, [dataMesDelete, dataMesVerified, dataMesUnVerified, dataMesRegister, page, angkatan, fullName, verify, vote])

  //useEffect(() => {
  //  if (dataMetaDpt.totalPage <= 1) {
  //    history.push('?page=1')
  //  }
  //}, [dataMetaDpt])

  const statusVerified = [
    { text: 'Terverifikasi', value: true},
    { text: 'Belum Terverifikasi', value: false}
  ]

  const statusVote = [
    { text: 'Voted', value: true},
    { text: 'Unvoted', value: false}
  ]

  const reset = () => {
    
    delete req.angkatan
    delete req.fullName
    delete req.verify
    delete req.vote
    history.push(req)
    
  }

  const col = [
    { id: "no", label: "No", minWidth: 80 },
    { id: "name", label: "Nama", minWidth: 170 },
    {
      id: "angkatan",
      label: "Angkatan",
      minWidth: 100,
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 40,
      align: "left",
    },
    {
      id: "nomerHandphone",
      label: "Nomer Handphone",
      minWidth: 170,
      align: "left",
    },
    {
      id: "nim",
      label: "NIM",
      minWidth: 170,
      align: "left",
    },
    {
      id: "edit",
      label: "Edit/Lihat",
      minWidth: 170,
      align: "left",
    },
    
    {
      id: "hasVerified",
      label: "Status Verifikasi",
      minWidth: 170,
      align: "left",
    },
    {
      id: "hasVoted",
      label: "Status vote",
      minWidth: 90,
      align: "left",
    },
    {
      id: "input",
      label: "Tanggal Input",
      minWidth: 170,
      align: "left",
    },
    {
      id: "change",
      label: "Tanggal Edit",
      minWidth: 170,
      align: "left",
    },
    {
      id: "delete",
      label: "Action",
      minWidth: 170,
      align: "left",
    },
  ];

  const voted = (status) => {
    return (
      <div
        className='votedIndicator'
        style={{ backgroundColor: status ? "var(--primary-color)" : "#FFF6D2" }}
      ></div>
    );
  };

  const idUser = (id, name) => {
    setConfirmation(true);
    setidDPT(id);
    setnamaDPT(name);
  };
  const verifiedAction = (id, name, action) => {
    dispatch(fetchUpdateVerified(id, name, action));
  };
  const row = [];

  const dataRow = () => {
    data.map((el, idx) => {
      const size = 15
      let b = idx+1;
      if ( page > 1 ) {
        b = ( idx+1 )+(( page - 1 ) * size );
      }
    
      const obj = {
        no: b < 10 ? `0${b}` : b,
        name: el.fullName,
        email: el.email,
        nomerHandphone: el.phoneNumber,
        angkatan: el.angkatan,
        nim: !el.nim || el.nim === "null" ? "-" : el.nim,
        input: moment.utc(el.createdAt).format("DD MMM YYYY"),
        hasVoted: voted(el.hasVoted),
        hasVerified: (
          <SwitchCheck
            nameSwitch={el.userId}
            checked={el.hasVerified}
            verified={(value) => verifiedAction(el.dptId, el.fullName, (value?'approve' : 'reject'))}
            message={messageVerified}
          />
        ),
        delete: (
          <Button
            label={"Delete"}
            className='delete'
            onClick={() => idUser(el.dptId, el.fullName)}
          />
        ),
        id: el.dptId,
        edit: <p style={{cursor:'pointer'}} onClick={(value) => history.push(`?id=${el.dptId}`)}>Lihat/Edit</p>,
        change: moment.utc(el.updatedAt).format("DD MMM YYYY"),
      };
      return row.push(obj);
    });
  };
  dataRow();

  //const handleClick = () => {
  //  const newQuery = queryString.stringify({
  //    fullName: e.target.value,
  //  });
  //  const before = page? `page=${page}` : ''
  //  history.push(`?${before}&${newQuery}`);
  //}

  const [searchName, setSearchName] = useState("");

  const submitValue = () => {
    if(searchName){
      req['fullName'] = searchName;
      req.page = 1;
      delete req.download;
    }else{
      delete req.fullName;
      delete req.download;
    }
    const newQuery = queryString.stringify(req);
    history.push(newQuery?`?${newQuery}` : search);
  
  };

  const deleted = (id, name) => {
    dispatch(fetchDeleteDpt(id, name));
  };

  const downloadDPT = () => {
    req['download'] = true;

    const newQuery = queryString.stringify(req);
    history.push(newQuery?`?${newQuery}` : search);
  }

  const optionGender = [
    { label: 'Laki-laki', value: 'Male'},
    { label: 'Perempuan', value: 'Female'},
  ]

  if (search.includes("?createDPT=true") && createDPT) {
    return  <section>
      <h4 style={{fontWeight:'normal', marginBottom:'1rem'}}>Register DPT</h4>
      <RegisterForm optionGender={optionGender} 
        isLoading={isLoadingRegister}
        onSubmit={(values) => {
          //const phone = `${values.countryCode}${inputPhone(values.phoneNumber)}`

          const newData = {}
          newData['fullName']= capitalizedArray(values.fullName)
          newData['email']= values.email
          newData['angkatan']= Number(values.angkatan)
          newData['phoneNumber']= values.phoneNumber
          newData['gender']= values.gender
          newData['nim']= values.nim
          dispatch(register(newData))
        }} 
      />
      </section>;
  }

  if (search.includes("?id") || (search.includes("?id=create") && id)) {
    return <DetailDPT />;
  }
 
  return (
    <section className='dpt'>
      <h3>Daftar DPT MUNAS IKATA 2021</h3>
     
      <section className='search'>
        <div>
          <input
            type='text'
            placeHolder='Nama DPT'
            name='nama'
            defaultValue={fullName? fullName : ''}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button label='Cari' className='find' onClick={submitValue} />
          <Button label='Download' className='download' onClick={downloadDPT} download />
          <section>
         
          <Button
            label='Create DPT'
            onClick={() => history.push("?createDPT=true")}
          />
        </section>
        </div>
        <div>
        <label>
          Pilih Angkatan :
          <span>
            <select
              className='select-tabheader'
              onChange={(e) => {
                if(e.target.value){
                  req['angkatan'] = e.target.value;
                  req.page = 1;
                  delete req.download;
                }else{
                  delete req.angkatan;
                  delete req.download;
                }
                const newQuery = queryString.stringify(req);
                history.push(newQuery?`?${newQuery}` : search);
              
            
              }}
              value={angkatan? angkatan : 'All'}
            >
              <option value=''>All</option>
              {angkatanKuliah.map((el, idx) => {
                return (
                  <>
                    <option key={idx} value={el.value} name={el.text}>
                      {el.text}
                    </option>
                  </>
                );
              })}
            </select>
          </span>
        </label>
        <label>
          Pilih Status :
          <span>
            <select
              className='select-tabheader'
              onChange={(e) => {
                if(e.target.value){
                  req['verify'] = e.target.value;
                  req.page = 1;
                  delete req.download;
                }else{
                  delete req.verify;
                  delete req.download
                }
                const newQuery = queryString.stringify(req);
                history.push(newQuery?`?${newQuery}` : search);
              
            
              }}
              value={verify?verify:'All'}
            >
              <option value=''>All</option>
              {statusVerified.map((el, idx) => {
                return (
                  <>
                    <option key={idx} value={el.value} name={el.text}>
                      {el.text}
                    </option>
                  </>
                );
              })}
            </select>
          </span>
        </label>
        <label>
          Pilih Status Vote :
          <span>
            <select
              className='select-tabheader'
              onChange={(e) => {
                if(e.target.value){
                  req['vote'] = e.target.value;
                  req.page = 1;
                  delete req.download;
                }else{
                  delete req.vote;
                  delete req.download;
                }
                const newQuery = queryString.stringify(req);
                history.push(newQuery?`?${newQuery}` : search);
              
            
              }}
              value={vote? vote:'All'}
            >
              <option value=''>All</option>
              {statusVote.map((el, idx) => {
                return (
                  <>
                    <option key={idx} value={el.value} name={el.text}>
                      {el.text}
                    </option>
                  </>
                );
              })}
            </select>
          </span>
        </label>
        <section>
          <Button className='small' label='Reset' onClick={() => reset()} />
        </section>
        </div>
        
      </section>
      <section>
        {angkatan ? (
          <p>{`Jumlah DPT angkatan ${angkatan} ${
            fullName ? `dengan nama ${capitalizedArray(fullName)}` : ""
          } = ${dataMetaDpt.totalItem} orang`}</p>
        ) : (
          <p>{`Jumlah DPT Total ${
            fullName ? `dengan nama ${fullName}` : ""
          } = ${dataMetaDpt.totalItem} orang`}</p>
        )}
      </section>
      <section>
        <TableGrid
          columns={col}
          rows={row}
          isLoading={isLoading}
        />
      </section>
      <section>
        <Pagination meta={dataMetaDpt} location={location} />
      </section>
      <ModalConfirmation
        message={`Apakah Anda yakin menghapus DPT MUNAS IKATA dengan nama ${namaDPT}?`}
        onClose={() => setConfirmation(false)}
        open={confirmation}
        deleted={true}
        isLoading={isLoadingDelete}
        send={() => deleted(idDPT, namaDPT)}
      />
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
    </section>
  );
}
