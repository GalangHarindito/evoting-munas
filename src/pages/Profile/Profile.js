import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProfile, changeLastPage } from "./action";
import queryString from "querystring";
import "./style.css";
import Biodata from "../../component/fragment/Biodata";
import Address from "../../component/fragment/Address";
import Occupation from "../../component/fragment/Occupation";
import Tabs from "../../component/elements/tabs/Tabs";
import { useHistory, useLocation } from "react-router";
import Button from "../../component/elements/button";
import EditProfile from "../EditProfile";
import Loaders from "../../component/elements/loaders/Loaders";

export default function Profile() {
  const history = useHistory();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.profile);
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

  const nav = [
    { name: "Biodata", value:'/profile?tab=biodata'},
    { name: "Alamat", value:'/profile?tab=address'},
    { name: "Pekerjaan", value:'/profile?tab=occupation'}
  ];

  const { edit } = queryString.parse(search.replace("?", ""));
  const [route, setRoute] = useState('');
  const [profileSelect, setprofileSelect] = useState('');
  const translateRoute = (value) => {

    if(value === '/profile?tab=biodata'){
      return 'biodata'
    }
    else if(value === '/profile?tab=address'){
      return 'address'
    }
    else if(value === '/profile?tab=occupation'){
      return 'occupation'
    }
  }


  return (
    <>
    {edit === 'biodata' || edit === 'address' || edit === 'occupation'  ? <EditProfile /> :
    <section>
        <div className='profile-dpt'>
          <div className='gr-1'>
            <h4>Data Diri DPT</h4>
            <Button onClick={() => {
              if(profileSelect)
              return history.push(`/profile?edit=${profileSelect}`)
              else{
              return history.push(`/profile?edit=biodata`)
              }
            }} 
              label='Edit Profile' 
              className='buttonLink'
            />
          </div>

          <br />
          <Tabs data={data} />
          <label className='label-menu'>Pilih Profile:</label>
          <select className='select-tabheader'  onChange={e => {
            history.push(e.target.value)
            dispatch(changeLastPage(e.target.value))
            setRoute(e.target.value)
            setprofileSelect(translateRoute(e.target.value))
          }
          
        }
          value={route}
          >
            <option value=""></option>
            {nav.map((el,idx) => 
              {
                return(
                  <>
                  <option key={idx} value={el.value} name={el.name}>{el.name}</option>
                  </>
                )
            })}
          </select>
          <br />
          {isLoading && <Loaders use='global' />}
          
          {/*<div className='drop-down'>
          <p>Profile :</p>
          <DropDown id='dropDown' data= {data} />
        </div>*/}
          {!isLoading && <Content />}
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
