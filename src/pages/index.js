import React from 'react';

const Suspensed = (Element) => function suspense(props) {
  return (
    <React.Suspense fallback={<div />}>
      <Element {...props} />
    </React.Suspense>
  );
};

export default {
  Login: Suspensed(React.lazy(() => import('./Login'))),
  Register: Suspensed(React.lazy(() => import('./Register'))),
  ForgotPassword: Suspensed(React.lazy(() => import('./ForgotPassword'))),
  Dashboard: Suspensed(React.lazy(() => import('./Dashboard'))),
  Profile: Suspensed(React.lazy(() => import('./Profile'))),
  Evoting: Suspensed(React.lazy(() => import('./Evoting'))),
  DPT: Suspensed(React.lazy(() => import('./DPT'))),
  SUMMARY: Suspensed(React.lazy(() => import('./Summary'))),
  CalonKetua:Suspensed(React.lazy(() => import('./admin/CalonKetua'))),
  Events:Suspensed(React.lazy(() => import('./admin/Events'))),
  Bantuan:Suspensed(React.lazy(() => import('./Bantuan')))
};