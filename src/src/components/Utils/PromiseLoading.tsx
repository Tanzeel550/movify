import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import LoadingDots from './LoadingDots';

const PromiseLoading = props => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });

  return promiseInProgress && <LoadingDots />;
};

export default PromiseLoading;
