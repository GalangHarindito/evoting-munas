import React from "react";
import './style.css'

export default function Evoting() {

  //  const timer = () => {
  //  // Set the date we're counting down to
  //  var countDownDate = new Date('Dec 18, 2021 09:00:00').getTime();

  //  // Update the count down every 1 second
  //  var x = setInterval(function () {
  //    // Get today's date and time
  //    var now = new Date().getTime();

  //    // Find the distance between now and the count down date
  //    var distance = countDownDate - now;

  //    // Time calculations for days, hours, minutes and seconds
  //    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //    var hours = Math.floor(
  //      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //    );
  //    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //    // Display the result in the element with id='demo'
  //    document.getElementById('evoting-launch').innerHTML =
  //      days + ' hari : ' + hours + ' jam : ' + minutes + ' menit : ' + seconds + ' detik ';

  //    // If the count down is finished, write some text
  //    if (distance < 0) {
  //      clearInterval(x);
  //      document.getElementById('evoting-launch').innerHTML = 'EXPIRED';
  //    }
  //  }, 1000);
  //};

  //useEffect(() => {
  //  timer()
  //})

  //timer()

  return(
    <section className='evoting'>
      <h4>Pemilihan Ketua IKATA Periode 2021 - 2025</h4>
      <div className='countdown'>
        <p id='evoting-launch'/>
      </div>
       
    </section>
  )
}