import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './style.css';

export default function Chart(props) {
    const { data, width, height, layout } = props;
    const CustomTooltip = ({ active, payload, label }) => {
      
      if (active && payload && payload.length) {
      
        return (
          <div className='custom-tooltip'>
            <p className='label'>Angkatan {`${label}`}</p>
            <p className='intro'>Total DPT : {payload[0].payload.countAllDpt} orang</p>
            <p className='intro'>Total DPT Terverifikasi : {payload[0].payload.countAllDptVerified} orang</p>
            <p className='intro'>Total DPT Belum Terverifikasi : {payload[0].payload.countAllDptUnverified} orang</p>
            <p className='intro'>Total DPT Voting : {payload[0].payload.countAllDptVoted} orang</p>
            <p className='intro'>Total DPT Belum Voting : {payload[0].payload.countAllDptUnvoted} orang</p>
          </div>
        );
      }
  
      return null;
    };

    return (
      <BarChart
      width={width}
      height={height}
      data={data}
      layout={layout}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type={ 'category' } orientation={ 'left' } dataKey={'angkatan'?'angkatan' : 'All'}/>
      <Tooltip content={<CustomTooltip />} />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
      <Bar dataKey="countAllDptUnverified" stackId="a" fill="#8884d8" />
      <Bar dataKey="countAllDptVerified" stackId="a" fill="#82ca9d" />
      <Bar dataKey="countAllDptUnvoted" stackId="b" fill="var(--primary-color)" />
      <Bar dataKey="countAllDptVoted" stackId="b" fill="red" />
      <Bar dataKey="countAllDpt" fill="#ffc658" />
    </BarChart>
    );
}
