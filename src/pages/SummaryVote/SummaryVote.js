import React, { useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import InformationVote from "../../component/fragment/InformationDPT";
import { fetchSummaryAll } from "../Summary/action";
import { fetchResultVote } from "./action";
import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

export default function SummaryVote() {
  const { dataAll } = useSelector((s) => s.summary);
  const { dataResult } = useSelector((s) => s.summaryVote);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummaryAll());
    dispatch(fetchResultVote());
    //callResult()
  }, []);

  //const callResult = () => {
  //  setInterval(() => dispatch(fetchResultVote()), 30000);
  //};

  return (
    <section className='summary-vote'>
      <h3>E-Voting KETUA IKATA UPN PERIODE 2021 - 2025 </h3>
      <section>
        <InformationVote data={dataAll} />
      </section>
      <h3>RESULT</h3>
      {dataResult.length >= 1 ? (
        <section>
          <ResultNumber data={dataResult} />
        </section>
      ) : (
        ""
      )}
      {dataResult.length >= 1 ? (
        <section>
          <h5>Grafik E-VOTE</h5>
          <ResultChart
            data={dataResult}
            height={500}
            width={500}
            layout='vertical'
          />
        </section>
      ) : (
        ""
      )}
    </section>
  );
}

function ResultChart(props) {
  const { data } = props;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${label}`}</p>
          <p className='intro'>Persentase Suara : {payload[0].value}%</p>
        </div>
      );
    }

    return null;
  };

  const barColors = ["#177E89", "#084C61", "#DB3A34", "#FFC857", "#323031"];



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
      <YAxis
        tickFormatter={(tick) => {
          return `${tick}%`;
        }}
      />
      <Tooltip content={<CustomTooltip />} />

      <Bar dataKey='persetaseSuara' barSize={100} fill='#8884d8'>
     
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
}

function ResultNumber(props) {
  const { data } = props;
  return (
    <section className='result-number'>
      {data.map((el, idx) => {
        return (
          <section key={idx}>
            <label>{el.number}</label>
            <div
              className='image-candidate'
              style={{ backgroundImage: `url(${el.photo})` }}
            ></div>
            <h6>{el.fullName}</h6>
            <h5>{el.jumlahSuara}</h5>
          </section>
        );
      })}
    </section>
  );
}
