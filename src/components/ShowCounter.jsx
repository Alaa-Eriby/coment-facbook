import React from 'react';
import useStore from '../store/useStore';

const ShowCounter = () => {
  const { count } = useStore();
  return <label>{count}</label>;
};

export default ShowCounter;
