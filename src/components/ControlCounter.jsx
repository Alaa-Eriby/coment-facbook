import React from 'react';
import useStore from '../store/useStore';

const ControlCounter = () => {
  const { inc, dec } = useStore();
  return (
    <div>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
};

export default ControlCounter;