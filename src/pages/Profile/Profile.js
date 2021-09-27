import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProfile } from "./action";
import queryString from "querystring";
import "./style.css";
import Biodata from "../../component/fragment/Biodata";
import Address from "../../component/fragment/Address";
import Occupation from "../../component/fragment/Occupation";
import Tabs from "../../component/elements/tabs/Tabs";
import { useHistory, useLocation } from "react-router";
import Button from "../../component/elements/button";
import EditProfile from "../EditProfile";

export default function Profile() {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { dataProfile, isLoading } = useSelector((s) => s.profile);
  const { message } = useSelector((s) => s.editProfile);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (message === 'Data Biodata berhasil diperbaharui' || message === 'Data Alamat berhasil diperbaharui' || message === 'Data Pekerjaan berhasil diperbaharui') {
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
    tabsName: "tab",
  };

  const onClick = () => () => {
    const newQuery = queryString.stringify({ profileEdit: true });
    history.push(`?${newQuery}`);
  };

  const { edit } = queryString.parse(search.replace("?", ""));

  return (
    <>
    {edit === 'biodata' || edit === 'address' || edit === 'occupation'  ? <EditProfile /> :
    <section>
        <div className='profile-dpt'>
          <div className='gr-1'>
            <h4>Data Diri DPT</h4>
            <Button onClick={() => history.push('/profile?edit=biodata')} label='Edit Profile' className='buttonLink' />
          </div>

          <br />
          <Tabs data={data} />
          <br />
          {/*<div className='drop-down'>
          <p>Profile :</p>
          <DropDown id='dropDown' data= {data} />
        </div>*/}
          <Content />
        </div>
      </section>
    }
      
    </>
  );
}

function Content(props) {
  const { dataProfile, dataBiodata, dataAddress, dataOccupancy } = useSelector(
    (s) => s.profile
  );
  const { search } = useLocation();
  const { tab } = queryString.parse(search.replace("?", ""));
  if (tab === "biodata") {
    return (
      <div id='Profile-Biodata'>
        <Biodata data={dataBiodata} profile={dataProfile} />
      </div>
    );
  }
  if (tab === "address") {
    return (
      <div id='Profile-Address'>
        <Address data={dataAddress} />
      </div>
    );
  }
  if (tab === "occupation") {
    return (
      <div id='Profile-Occupation'>
        <Occupation data={dataOccupancy} />
      </div>
    );
  }
  return (
    <div id='Profile-Biodata'>
      <Biodata data={dataBiodata} profile={dataProfile} />
    </div>
  );
}
