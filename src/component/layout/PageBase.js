import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Headers from '../../component/elements/headers';
import { routes } from '../../configs/index';
import { clearStorages } from '../../utils/storage';
import './style.css';
import logo from '../../assets/img-munas-1.png';
import { getUserData } from '../../utils/storage';

export default function PageBase({ children }) {

  useEffect(() => {
    const app = document.getElementById('root');
    app.className = 'pagebase';
  }, []);

  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const [dataUser] = useState(getUserData);

  const logOut = () => {
    clearStorages();
    window.location.href = routes.LOGIN;
  };

  const svgLogOut = 
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5187 8.62106V7.53256C17.5187 5.1584 15.5937 3.2334 13.2195 3.2334H7.53201C5.15901 3.2334 3.23401 5.1584 3.23401 7.53256V20.5176C3.23401 22.8917 5.15901 24.8167 7.53201 24.8167H13.2312C15.5983 24.8167 17.5187 22.8976 17.5187 20.5304V19.4302" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.4444 14.025H11.3966" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.0281 10.624L25.4441 14.0249L22.0281 17.4269" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

const svgDashboard = 
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id='icDashboard' opacity="0.4" d="M18.7548 2.33337H22.7051C24.341 2.33337 25.6667 3.6702 25.6667 5.32V9.30365C25.6667 10.9534 24.341 12.2903 22.7051 12.2903H18.7548C17.1188 12.2903 15.7932 10.9534 15.7932 9.30365V5.32C15.7932 3.6702 17.1188 2.33337 18.7548 2.33337Z" fill="#68AE29"/>
<path id='icDashboard' fill-rule="evenodd" clip-rule="evenodd" d="M5.29492 2.33337H9.24522C10.8812 2.33337 12.2068 3.6702 12.2068 5.32V9.30365C12.2068 10.9534 10.8812 12.2903 9.24522 12.2903H5.29492C3.65894 12.2903 2.33331 10.9534 2.33331 9.30365V5.32C2.33331 3.6702 3.65894 2.33337 5.29492 2.33337ZM5.29492 15.7098H9.24522C10.8812 15.7098 12.2068 17.0466 12.2068 18.6964V22.6801C12.2068 24.3288 10.8812 25.6667 9.24522 25.6667H5.29492C3.65894 25.6667 2.33331 24.3288 2.33331 22.6801V18.6964C2.33331 17.0466 3.65894 15.7098 5.29492 15.7098ZM22.705 15.7098H18.7547C17.1188 15.7098 15.7931 17.0466 15.7931 18.6964V22.6801C15.7931 24.3288 17.1188 25.6667 18.7547 25.6667H22.705C24.341 25.6667 25.6666 24.3288 25.6666 22.6801V18.6964C25.6666 17.0466 24.341 15.7098 22.705 15.7098Z" fill="#68AE29"/>
</svg>

const svgEvoting = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.59999 11.902V19.9055" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0444 8.07239V19.9056" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4 16.1313V19.9055" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.4666 2.33337H8.53331C4.7222 2.33337 2.33331 5.03081 2.33331 8.84939V19.1507C2.33331 22.9693 4.71109 25.6667 8.53331 25.6667H19.4666C23.2889 25.6667 25.6666 22.9693 25.6666 19.1507V8.84939C25.6666 5.03081 23.2889 2.33337 19.4666 2.33337Z" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

let navsDpt = [
  { name: 'Dashboard', image: svgDashboard, link: '/', linkTo: `/`},
  { name: 'Profile', image: svgDashboard, link: `/profile`, linkTo: `/profile?id=${dataUser.id}`},
  { name: 'E-Voting', image: svgEvoting, link: '/e-voting'},
  { name: 'Keluar', image: svgLogOut, func:logOut }
];

let navsVerifier = [
  { name: 'DPT', image: svgDashboard, link: '/dpt', linkTo: `/dpt`},
  { name: 'Summary', image: svgDashboard, link: `/summary-dpt`, linkTo: `/profile?id=${dataUser.id}`},
  { name: 'Keluar', image: svgLogOut, func:logOut }
];

const menu = () => {
  if(dataUser.role === 'ROLE_DPT'){
    return navsDpt
  }
  if(dataUser.role === 'ROLE_VERIFIER'){
    return navsVerifier
  }
} 
console.log(menu())
  return (
    <>
      <Headers />
      <aside className={'aside'}>
        <img src={logo} alt="logo" />
        <nav>
          {menu().map((n, idx) => (
            <Link
              className={`/${path}`=== n.link ? 'active' : ''}
              key={idx}
              onClick={n.func}
              to={n.link}>
             <>{n.image}</>
              {n.name}
            </Link>
          ))}
          
        </nav>
        {/*<footer>
          <button onClick={logOut}>
            <img src={logout} />
            Log Out
          </button>
        </footer>*/}
      </aside>
      <main className='main'>
        {children}
      </main>
    </>
  );
}
