import React, { useEffect, useState } from "react";
import { Field } from "redux-form";
import "./style.css";
import Button from "../../elements/button/Button";
import Text from "../../field/text/Text";
import Select from "../../field/select/Select";
import RadioGroup from "../../field/radioGroup/RadioGroup";
import ImageField from "../../field/Image/Image";
import { useSelector } from "react-redux";
import imageEmpty from "../../../assets/blank-person2.svg";
import { angkatanKuliah } from "../../../utils/format";
import { fileAccept } from "../../../utils/format";
import TextArea from "../../field/textArea/TextArea";

export default function CalonKetuaForm(props) {
  const { calonKetuaForm: dataForm } = useSelector((s) => s.form);
  const [size, setSize] = useState(false);

  const { values } = dataForm;
  const {
    data,
    dataAddressCandidate,
    fetch1,
    fetch2,
    initialize,
    handleSubmit,
    optionOccupation,
    dataPropinsi,
    dataKabupaten,
    dataKecamatan,
    optionGender,
    isLoadingpostKetua,
    isLoading,
  } = props;

  const { biodata, occupancy } = data;
  const  photo = biodata? biodata.photo: null;
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {


      let number = biodata? biodata.number:null;
      let fullName = biodata? biodata.fullName:null;
      let phoneNumber = biodata? biodata.phoneNumber:null;
      let nim = biodata? biodata.nim:null;
      let angkatan = biodata? biodata.angkatan:null;
      let gender = biodata? biodata.gender:null;
      let photo = biodata? biodata.photo:null;
      let jargon = biodata? biodata.jargon:null;
      let visi = biodata? biodata.visi:null;
      let misi = biodata? biodata.misi:null;
      let linkVideo = biodata? biodata.linkVideo:null;
      let occupation = occupancy? occupancy.occupation:null;
      let jobTitle = occupancy? occupancy.jobTitle:null;
      let officeName = occupancy? occupancy.officeName:null;
      let officeAddress = occupancy? occupancy.officeAddress:null;
      let address = dataAddressCandidate? dataAddressCandidate.address:null;
      let kabupatenId = dataAddressCandidate? dataAddressCandidate.kabupatenId:null;
      let kecamatanId = dataAddressCandidate? dataAddressCandidate.kecamatanId:null;
      let kodePos = dataAddressCandidate? dataAddressCandidate.kodePos:null;
      let propinsiId = dataAddressCandidate? dataAddressCandidate.propinsiId:null;
      let email = biodata? biodata.email:null;
      let linkedIn = biodata? biodata.linkedIn:null;
      let facebook = biodata? biodata.facebook:null;
      let instagram = biodata? biodata.instagram:null;
      let description = biodata? biodata.description:null;
      let organizationExperience = biodata? biodata.organizationExperience:null;

    //const { email } = dataAccount
    initialize({
      ...values,
      number: number,
      fullName: fullName,
      phoneNumber: phoneNumber,
      nim: nim,
      angkatan: angkatan,
      gender: gender,
      photo: photo,
      jargon: jargon,
      visi: visi,
      misi: misi,
      linkVideo: linkVideo,
      occupation: occupation,
      jobTitle: jobTitle,
      officeName: officeName,
      officeAddress: officeAddress,
      address: address,
      kabupatenId: kabupatenId,
      kecamatanId: kecamatanId,
      kodePos: kodePos,
      propinsiId: propinsiId,
      email: email,
      linkedIn: linkedIn,
      facebook: facebook,
      instagram: instagram,
      description: description,
      organizationExperience: organizationExperience
    });
  }, [biodata, occupancy, dataAddressCandidate]);

  const handlePhoto = (event) => {
    setSelectedImage(event.target.files[0]);
    return event.target.files[0];
  };

  const error = () => {
    if (selectedImage) {
      if (Number(selectedImage.size) / 1024 > 1024) {
        return "File tidak lebih besar dari 1MB";
      }
    } else {
      return "";
    }
    return "";
  };

  const fileType = ["image/png", "image/jpg", "image/jpeg"];

  return (
    <form className='calonKetuaForm' onSubmit={handleSubmit}>
      <section>
        <Field
          component={ImageField}
          name='photo'
          onChange={(event) => {
            handlePhoto(event);
          }}
          file={selectedImage}
          image={photo ? photo : imageEmpty}
          caption={`Maksimal 1MB. Ekstensi file: ${fileAccept(fileType)}`}
          rules={error()}
        />
      </section>
      <section>
        <Field component={Text} label='Nomer Urut' name='number' />
      </section>
      <h4>Data Diri Calon Ketua</h4>

      <div className='candidate-address'>
        <div className='form-select'>
          <section>
            <Field component={Text} label='Nama Lengkap' name='fullName' />
          </section>
          <section>
            <Field
              component={Text}
              label='Nomer Handphone'
              name='phoneNumber'
            />
          </section>
          <section>
            <Field component={Text} label='Email' name='email' />
          </section>
          <section style={{display:'none'}}>
            <Field component={Text} label='identityNumber' name='identityNumber' />
          </section>
          <section>
            <Field component={Text} label='Nomer Induk Mahasiswa' name='nim' />
          </section>
          <div className='group-1 form-select'>
            <section>
              <Field
                component={Select}
                label='Angkatan'
                name='angkatan'
                options={angkatanKuliah}
                inputProps={{ placeholder: "" }}
              />
            </section>
            <section>
              <Field
                component={RadioGroup}
                label='Jenis Kelamin'
                name='gender'
                options={optionGender}
              />
            </section>
            
            <section>
            <Field
              component={Text}
              label='Link Video '
              name='linkVideo'
            />
          </section>
          <section>
            <Field
              component={Text}
              label='linkedin'
              name='linkedIn'
            />
          </section>
          <section>
            <Field
              component={Text}
              label='facebook'
              name='facebook'
            />
          </section>
          <section>
            <Field
              component={Text}
              label='instagram'
              name='instagram'
            />
          </section>
          </div>
        </div>

        <div className='form-select'>
          <section>
            <Field
              component={TextArea}
              inputProps={{ placeholder: "", rows: "5" }}
              label='Tagline/Jargon'
              name='jargon'
            />
          </section>
          <section>
            <Field
              component={TextArea}
              inputProps={{ placeholder: "", rows: "5" }}
              label='Visi'
              name='visi'
            />
          </section>
          <section>
            <Field
              component={TextArea}
              inputProps={{ placeholder: "", rows: "5" }}
              label='Misi'
              name='misi'
            />
          </section>
          <section>
            <Field
              component={TextArea}
              inputProps={{ placeholder: "", rows: "5" }}
              label='Deskripsi Diri'
              name='description'
            />
          </section>
          <section>
            <Field
              component={TextArea}
              inputProps={{ placeholder: "", rows: "5" }}
              label='Pengalaman Organisasi'
              name='organizationExperience'
            />
          </section>

        </div>
      </div>
      <h4>Data Pekerjaan Calon Ketua</h4>
      <div className='candidate-address'>
        <div className='form-select'>
          <section>
            <Field
              component={Select}
              label='Jenis Pekerjaan'
              name='occupation'
              inputProps={{ placeholder: "" }}
              options={optionOccupation}
            />
          </section>
          <section>
            <Field component={Text} label='Jabatan' name='jobTitle' />
          </section>
          <section>
            <Field
              component={Text}
              label='Nama Kantor/Instansi'
              name='officeName'
            />
          </section>
        </div>
        <section>
          <Field
            component={TextArea}
            label='Alamat Kantor/Instansi'
            name='officeAddress'
            inputProps={{ placeholder: "", rows: "9" }}
          />
        </section>
      </div>
      <h4>Data Alamat Calon Ketua</h4>
      <div className='candidate-address'>
        <section>
          <Field
            component={TextArea}
            label='Alamat'
            name='address'
            inputProps={{ placeholder: "", rows: "13" }}
          />
        </section>
        <div className='form-select'>
          <section>
            <Field
              component={Select}
              label='Provinsi'
              name='propinsiId'
              inputProps={{ placeholder: "" }}
              options={dataPropinsi}
              onChange={(event) => fetch1(event.target.value)}
            />
          </section>
          <section>
            <Field
              component={Select}
              label='Kabupaten/Kota'
              name='kabupatenId'
              inputProps={{ placeholder: "" }}
              options={dataKabupaten}
              onChange={(event) => fetch2(event.target.value)}
            />
          </section>
          <section>
            <Field
              component={Select}
              label='Kecamatan'
              name='kecamatanId'
              inputProps={{ placeholder: "" }}
              options={dataKecamatan}
            />
          </section>
          <section>
            <Field component={Text} label='Kode Pos' name='kodePos' />
          </section>
        </div>
      </div>
      <section className='form-button'>
        <Button
          label={"Simpan"}
          onSubmit={handleSubmit}
          isLoading={isLoadingpostKetua}
          disabled={size}
        />
      </section>
    </form>
  );
}
