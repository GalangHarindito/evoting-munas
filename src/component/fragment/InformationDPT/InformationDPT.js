import React from 'react';
import './style.css';
import { titleSummary } from '../../../utils/format';

export default function InformationVote(props) {
const { data } = props;
  return(
    <section className='information-vote'>
      {Object.keys(data).map((el, idx) => {
        return(
          <section key={idx}>
            <h5>{titleSummary(el)}</h5>
            <h4>{data[el]}</h4>
          </section>
        )
      })}
    </section>
  )
}