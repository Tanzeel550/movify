import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import LoadingDots from './LoadingDots';

type Props = {
  area: string;
};

const PromiseLoading = ({ area }: Props) => {
  const { promiseInProgress } = usePromiseTracker({ area });
  if (promiseInProgress) return <LoadingDots />;
  return <></>;
};

export default PromiseLoading;
