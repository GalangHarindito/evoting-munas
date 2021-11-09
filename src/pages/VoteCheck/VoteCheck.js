import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "../../component/elements/button/Button";
import { getCheckVote } from "./action";
import "./style.css";
import { Link } from "react-router-dom";
import icArrowLeft from "../../assets/ic-arrow-left.svg"

export default function VoteCheck() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const { data, isLoading } = useSelector((s) => s.voteCheck);
  const verifyCode = () => {
    return code.split("\n");
  };

  return (
    <section className='vote-check'>
      <section>
        <div>
          <div>
            <img src={icArrowLeft } alt="icLeft" />
          <Link to='/e-voting'>Kembali ke Dashboard</Link>
          </div>
          
        <h3>Cek Kode Pemilihan</h3>
        </div>
        <div>
          <textarea
            name=''
            id=''
            cols='30'
            rows='5'
            onChange={(e) => setCode(e.target.value)}
            placeholder='Kode Pemilihan'
          />
          <div>
            <p>note: Maksimal 10 Kode Pemilihan</p>
            <p>
              Gunakan <b>ENTER </b>apabila lebih dari 1 Kode Pemilihan
            </p>
          </div>
        </div>
        <div>
          <Button
            label='Submit'
            isLoading={isLoading}
            onClick={() => dispatch(getCheckVote(verifyCode()))}
          />
        </div>
      </section>
      <section className='result-vote'>
        <h4>Result</h4>
        <table>
          <tr>
            <th>No</th>
            <th>Kode Pemilihan</th>
            <th>Hasil</th>
          </tr>
      
        {data.length >= 1 ?
          data.map((el, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el.voteToken}</td>
                <td>
                  {el.candidate.fullName}
                </td>
              </tr>
            );
          }) : ''}
            </table>
      </section>
    </section>
  );
}
