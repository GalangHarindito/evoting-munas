import React from 'react';
import { question } from '../../utils/question';
import Accordions from '../../component/elements/Accordion';
import './style.css';

export default function Bantuan() {
  return(
    <section className='bantuan'>
      <h4>Frequently Asked Question</h4>
      <section>
        <Accordions data={question} />
      </section>
      <p>Butuh bantuan atau pertanyaan lain silahkan <a href="https://docs.google.com/forms/d/e/1FAIpQLScGpbYVzPZZNzj9orZHE9uOBzaw2OqW0j1-oG_oWmbHzB2u1A/viewform" target="_blank" rel="noreferrer">Disini</a>.</p>
    </section>
  )
}