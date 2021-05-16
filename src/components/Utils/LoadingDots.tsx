import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingDots: React.FC = () => (
  <div className="loading-dots">
    <Loader type="ThreeDots" color="#9400ff" height="100" width="100" />
  </div>
);

export default LoadingDots;
