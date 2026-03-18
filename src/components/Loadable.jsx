import React, { Suspense } from 'react';
import { Spinner } from './ui/spinner';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Spinner /></div>}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
