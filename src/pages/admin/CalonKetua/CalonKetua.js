import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { fetchAllCandidate, fetchDeleteCandidate } from "./action";
import { useSelector } from "react-redux";
import queryString from "querystring";
import TableGrid from "../../../component/elements/Table/Table";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../../component/elements/button";
import DetailCalonKetua from "../DetailCalonKetua";
import moment from 'moment'; 
import ModalConfirmation from "../../../component/elements/ModalConfirmation";

export default function CalonKetua() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const { id } = queryString.parse(search.replace("?", ""));
  const { data, dataMesDelete, isLoadingDelete } = useSelector(
    (s) => s.calonKetua
  );
  const { dataEditCandidate, dataPostCandidate } = useSelector(s => s.detailCalonKetua)
  const [confirmation, setConfirmation] = useState(false);
  const [idCalon, setidCalon] = useState(true)
  const [namaCalon, setnamaCalon] = useState(true)

  useEffect(() => {
    dispatch(fetchAllCandidate());
  }, []);
  useEffect(() => {
    if(dataMesDelete === 'Berhasil' || dataEditCandidate === 'Data Calon Ketua Ikata Berhasil Diubah' || dataPostCandidate === 'Data Calon Ketua Ikata Berhasil Disimpan'){
      setConfirmation(false)
      dispatch(fetchAllCandidate());
    }
  },[dataMesDelete, dataEditCandidate, dataPostCandidate])

  const col = [
    { id: "number", label: "Nomer Urut", minWidth: 100 },
    { id: "name", label: "Nama", minWidth: 170 },
    {
      id: "angkatan",
      label: "Angkatan",
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
      id: "input",
      label: "Tanggal Input",
      minWidth: 170,
      align: "left",
    },
    {
      id: "edited",
      label: "Tanggal Diubah",
      minWidth: 170,
      align: "left",
    },
    {
      id: "detail",
      label: "Detail Profile",
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
  const idUser =(id, name)=>{
    setConfirmation(true)
    setidCalon(id)
    setnamaCalon(name)
  }
  const row = [];
  const dataRow = () => {
    data.map((el) => {
      const obj = {
        number: el.biodata.number,
        name: el.biodata.fullName,
        angkatan: el.biodata.angkatan,
        nim: el.biodata.nim,
        input: moment(el.biodata.createdAt).format('DD MMM YYYY'),
        edited: moment(el.biodata.updatedAt).format('DD MMM YYYY'),
        detail: (
          <p
            onClick={() => {
              history.push(`/caketum?id=${el.id}`);
              
              
            }}
            className='table-link'
          >
            Detail/Ubah
          </p>
        ),
        delete: <Button label={"Delete"} className='delete' onClick={() => idUser(el.id, el.biodata.fullName )} />,
      };
      return row.push(obj);
    });
  };
  dataRow();

  const deleted = (id) => {
    dispatch(fetchDeleteCandidate(id)
    )}

   if (search.includes("?id") || search.includes("?id=create") && id ) {

    return (
      <DetailCalonKetua />
    )
    }

  return (
    <section>
      <section className='header-calonKetua'>
        <h3>Calon Ketua</h3>
        <Button label='Create' onClick={() => history.push('/caketum?id=create')} />
      </section>
      <section>
        <TableGrid columns={col} rows={row} />
      </section>
         <ModalConfirmation 
         message= {`Apakah Anda yakin menghapus Calon Ketua IKATA dengan nama ${namaCalon}?`}
         onClose={() => setConfirmation(false)}
         open={confirmation}
         deleted={true}
         isLoading={isLoadingDelete}
         send={() => deleted(idCalon)}
         />
    </section>
  );
}
