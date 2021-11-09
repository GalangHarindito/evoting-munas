import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Headers from '../../component/elements/headers';
import { routes } from '../../configs/index';
import { clearStorages } from '../../utils/storage';
import './style.css';
import logo from '../../assets/img-munas-1.png';
import { getUserData } from '../../utils/storage';
import useOutsideClick from './useOutsideClick';

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

const svgProfile=<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="13.5088" cy="8.49087" rx="5.57437" ry="5.57437" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.66671 21.818C4.66521 21.4261 4.75285 21.039 4.923 20.686C5.45694 19.6181 6.96266 19.0522 8.21209 18.7959C9.11318 18.6036 10.0267 18.4751 10.9459 18.4114C12.6477 18.2619 14.3593 18.2619 16.0611 18.4114C16.9802 18.4758 17.8936 18.6043 18.7949 18.7959C20.0443 19.0522 21.55 19.5647 22.0839 20.686C22.4261 21.4056 22.4261 22.241 22.0839 22.9606C21.55 24.0819 20.0443 24.5945 18.7949 24.8401C17.8948 25.0404 16.981 25.1724 16.0611 25.2352C14.6759 25.3526 13.2844 25.3741 11.8963 25.2993C11.5759 25.2993 11.2662 25.2993 10.9459 25.2352C10.0294 25.1732 9.11906 25.0411 8.22277 24.8401C6.96266 24.5945 5.46762 24.0819 4.923 22.9606C4.75372 22.6035 4.66616 22.2132 4.66671 21.818Z" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

const svgBantuan=<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9999 3.20862C19.9604 3.20862 24.7915 8.04095 24.7915 14.0003C24.7915 19.9596 19.9604 24.792 13.9999 24.792C8.04052 24.792 3.20819 19.9596 3.20819 14.0003C3.20819 8.04095 8.04052 3.20862 13.9999 3.20862Z" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9942 9.57178V14.7273" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9941 18.4288H14.0058" stroke="#68AE29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

let navsDpt = [
  { name: 'Dashboard', image: svgDashboard, link: '/', linkTo: `/`},
  { name: 'Profile', image: svgProfile, link: `/profile`, linkTo: `/profile?id=${dataUser.id}`},
  { name: 'E-Voting', image: svgEvoting, link: '/e-voting'},
  { name: 'Bantuan', image: svgBantuan, link: '/bantuan'},
  { name: 'Keluar', image: svgLogOut, func:logOut }
];

let navsVerifier = [
  { name: 'Summary', image: svgDashboard, link: `/summary-dpt`, linkTo: `/profile?id=${dataUser.id}`},
  { name: 'DPT', image: svgProfile, link: '/dpt', linkTo: `/dpt`},
  { name: 'Keluar', image: svgLogOut, func:logOut }
];

let navsAdmin= [
  { name: 'Calon Ketua', image: svgDashboard, link: `/caketum`, linkTo: `/caketum`},
  { name: 'Events', image: svgProfile, link: '/events', linkTo: `/events`},
  { name: 'Voting Result', image: svgProfile, link: '/summary-vote', linkTo: `/summary-vote`},
  { name: 'Keluar', image: svgLogOut, func:logOut }
];


const menu = () => {
  if(dataUser.role === 'ROLE_DPT'){
    return navsDpt
  }
  if(dataUser.role === 'ROLE_VERIFIER'){
    return navsVerifier
  }
  if(dataUser.role === 'ROLE_ADMIN'){
    return navsAdmin
  }
} 
const [menuBar, setMenuBar] = useState(false);
const menuButton = () => {
  setMenuBar(!menuBar);
};

const ref = useRef();

useOutsideClick(ref, () => {
  if (menuBar) setMenuBar(false);
});


  return (
    <>
      {pathname !== '/summary-vote'? <Headers /> : ''}
      <aside className={'aside'}>
        <div>
            
           <img src={logo} alt="logo" />
        <div className={`bar-menu ${menuBar? 'change' : ''}`} onClick={() => menuButton()}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        </div>
       
        <nav className={menuBar? 'block' : 'none'} ref={ref}>
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
