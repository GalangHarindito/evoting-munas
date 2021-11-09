import React, { useEffect } from "react";
import "./style.css";
import { fetchAllEventsCategory, fetchPostEventsCategory, fetchAllEvents } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Tabs from "../../../component/elements/tabs/Tabs";
import queryString from "querystring";
import EventCategory from "../../../component/fragment/EventCategory";
import { ToastContainer } from "react-toastify";
import EventList from "../../../component/fragment/EventList";

export default function Events() {
  const dispatch = useDispatch();
  const { dataMesPostCategory } = useSelector((s) => s.events);
  useEffect(() => {
    dispatch(fetchAllEventsCategory());
    dispatch(fetchAllEvents());
  }, []);

  useEffect(() => {
    if(dataMesPostCategory){
      dispatch(fetchAllEventsCategory());

    }
  },[dataMesPostCategory])

  const data = {
    navItems: [
      { idx: 1, name: "Event Category", value: "eventCategory" },
      { idx: 2, name: "Event", value: "event" },
    ],
    navValues: ["event", "eventCategory"],
    tabsName: "tab",
  };

  

  return (
    <>
      <h3>Events</h3>
      <br />  
      <Tabs data={data} />
      <br />
      <Content />
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
    </>
  );
}

function Content() {
  const { dataCategory, dataEvent } = useSelector((s) => s.events);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { tab } = queryString.parse(search.replace("?", ""));
  

  if (tab === "eventCategory") {
    return (
      <div id='event-category'>
        <EventCategory data={dataCategory} submit={(value) => dispatch(fetchPostEventsCategory(value))} />
      </div>
    );
  }
  if (tab === "event") {
    return (
      <div id='Profile-Address'>
         <EventList data={dataEvent} />
      </div>
    );
  }
  return (
    <div id='event-category'>
      <EventCategory data={dataCategory}  />
    </div>
  );
}
