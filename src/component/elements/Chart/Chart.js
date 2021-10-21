import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './style.css';

export default function Chart(props) {
    const { data, width, height, layout } = props;

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
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
      <Bar dataKey="countAllDptUnverified" stackId="a" fill="#8884d8" />
      <Bar dataKey="countAllDptVerified" stackId="a" fill="#82ca9d" />
      <Bar dataKey="countAllDptUnvoted" stackId="b" fill="var(--primary-color)" />
      <Bar dataKey="countAllDptVoted" stackId="b" fill="red" />
      <Bar dataKey="countAllDpt" fill="#ffc658" />
    </BarChart>
    );
}
