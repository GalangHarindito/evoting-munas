import React from "react";
import EditBiodataForm from "../../form/EditBiodata";

export default function EditBiodata(props) {
  const { optionAngkatan,optionGender } = props;

  return(
    <>
    <EditBiodataForm />
    </>
  )
}