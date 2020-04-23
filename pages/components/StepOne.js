// @flow
import React, { useEffect } from 'react';
import { Step } from '../../src';

const StepOne = () => {
  useEffect(() => {
    console.log('step 1 mounted');
  }, []);

  return (
    <Step name="step 1">
      <p className="f3 tc">First step</p>
      <p className="tc">No validation here</p>
    </Step>
  );
};

export default StepOne;
