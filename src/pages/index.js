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
};