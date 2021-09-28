import React, { useEffect } from 'react';
import './style.css';
import { getAllDPT } from './action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DPT() {
  const dispatch = useDispatch();
  const { data, message, isLoading } = useSelector(s => s.dpt)
  useEffect(() => {
    dispatch(getAllDPT())
  },[])
  return(
    <section className='dpt'>
    <h3>Daftar DPT MUNAS IKATA 2021</h3>
    </section>
  )
}