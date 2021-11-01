import React, { useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import InformationVote from "../../component/fragment/InformationDPT";
import { fetchSummaryAll } from "../Summary/action";
import { fetchResultVote } from "./action";
import { useSelector } from "react-redux";
import Chart from "../../component/elements/Chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useLocation } from "react-router";

export default function SummaryVote() {
  const { dataAll } = useSelector((s) => s.summary);
  const { dataResult } = useSelector((s) => s.summaryVote);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummaryAll());
    dispatch(fetchResultVote()); 
    //callResult() 
  }, []);

  const callResult = () => {
    setInterval(() =>  dispatch(fetchResultVote()), 30000)
    
  }

  //useEffect(() => {
  //  if(pathname !== '/summary-vote'){
  //    clearTimeout(callResult);
  //  }
  //},[pathname])

  //console.log(pathname)

  return (
    <section className='summary-vote'>
      <h3>E-Voting KETUA IKATA UPN PERIODE 2021 - 2025 </h3>
      <section>
        <InformationVote data={dataAll} />
      </section>
      <h3>RESULT</h3>
     {dataResult.length >= 1 ? <section>
        <ResultNumber data={dataResult} />
      </section> : ''}
      {dataResult.length >= 1 ? <section>
        <h5>Grafik E-VOTE</h5>
        <ResultChart
          data={dataResult}
          height={500}
          width={500}
          layout='vertical'
        />
      </section> : '' }
    </section>
  );
}

function ResultChart(props) {
  const { data } = props;
  return (
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 5,
        left: 5,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='fullName' />
      <YAxis />
      <Tooltip />

      <Bar dataKey='jumlahSuara' fill='#8884d8' />
    </BarChart>
  );
}

function ResultNumber(props) {
  const { data } = props;
  return (
    <section className='result-number'>
      {data.map((el, idx) => {
        return (
          <section key={idx} >
            <label>{el.number}</label>
            <div className='image-candidate' style={{backgroundImage:`url(${el.photo})`}}></div>
            <h6>{el.fullName}</h6>
            <h5>{el.jumlahSuara}</h5>
          </section>
        );
      })}
    </section>
  );
}
