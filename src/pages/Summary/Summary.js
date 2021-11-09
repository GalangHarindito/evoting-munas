import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import './style.css';
import { fetchSummaryAll, fetchSummaryAngkatan } from './action';
import { useSelector } from 'react-redux';
import Chart from '../../component/elements/Chart';
import InformationVote from '../../component/fragment/InformationDPT';

export default function Summary() {
  const dispatch = useDispatch();
  const { dataAll, dataAngkatan } = useSelector(s => s.summary)

  useEffect(() => {
    dispatch(fetchSummaryAll())
    dispatch(fetchSummaryAngkatan())
  },[])

  return(
    <section className='summary'>
    <h3 style={{fontWeight:'normal'}}>Summary</h3>
    <section>
      <InformationVote data={dataAll} />
    </section>
      <br />
      <br />
    <section>
    <h3 style={{fontWeight:'normal'}}>Summary Angkatan</h3>
     <Chart data={dataAngkatan} height={3000} width={1000} layout='vertical' />
    </section>
    
    </section>
  )
}
