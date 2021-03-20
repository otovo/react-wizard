// @flow
import React, { useEffect } from 'react';
import { Step } from '../../src';

const StepOne = () => {
  useEffect(() => {
    console.log('step 1 mounted');
  }, []);

  return (
    <Step
      name="step 1"
      validator={() => {
        console.log('validator done');
      }}>
      <p className="f3 tc">First step</p>
    </Step>
  );
};

export default StepOne;
