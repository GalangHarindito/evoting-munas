import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import './style.css';
import { fetchSummaryAll, fetchSummaryAngkatan } from './action';
import { useSelector } from 'react-redux';
import Chart from '../../component/elements/Chart';

export default function Summary() {
  const dispatch = useDispatch();
  const { dataAll, dataAngkatan, isLoadingAll, message, isLoading } = useSelector(s => s.summary)

  useEffect(() => {
    dispatch(fetchSummaryAll())
    dispatch(fetchSummaryAngkatan())
  },[])

  const summaryChart = [
    {...dataAll}
  ]

  return(
    <section className='summary'>
    <h3 style={{fontWeight:'normal'}}>Summary</h3>
    <section>
      {/*<h5>Total DPT Terdaftar  : <b>{dataAll.countAllDpt || '-'} </b>orang</h5>
      <h5>Total DPT Terverifikasi  : <b>{dataAll.countAllDptVerified || '-'} </b>orang</h5>
      <h5>Total DPT Belum Terverifikasi  : <b>{dataAll.countAllDptUnverified || '-'} </b>orang</h5>
      <h5>Total DPT Voting  : <b>{dataAll.countAllDptVoted || '-'} </b>orang</h5>
      <h5>Total DPT Belum Voting  : <b>{dataAll.countAllDptUnvoted || '-'} </b>orang</h5>*/}
      <Chart data={summaryChart} height={500} width={500} layout='vertical' />
    </section>
      <br />
      <br />
    <section>
    <h3 style={{fontWeight:'normal'}}>Summary Angkatan</h3>
    {/*<section>
      {dataAngkatan.map((el,idx) => {
        return(
          <div key={idx}>
            <h5 style={{fontWeight:'normal'}}>Angkatan {el.angkatan}</h5>
            <p>Total DPT Terdaftar  : <b>{el.countAllDpt || '-'}</b> orang</p>
            <p>Total DPT Terverifikasi  : <b>{el.countAllDptVerified || '-'}</b> orang</p>
            <p>Total DPT Belum Terverifikasi  : <b>{el.countAllDptUnverified || '-'}</b> orang</p>
            <p>Total DPT Voting  : <b>{el.countAllDptVoted || '-'}</b> orang</p>
            <p>Total DPT Belum Voting  : <b>{el.countAllDptUnvoted || '-'}</b> orang</p>
          </div>
        )
      })}
    </section>*/}
     <Chart data={dataAngkatan} height={3000} width={1000} layout='vertical' />
    </section>
    
    </section>
  )
}
