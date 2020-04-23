// @flow
import React, { useEffect } from 'react';
import { Step } from '../../src';
import InputComponent from './InputComponent';
import { someAsyncFunc } from './asyncMock';

type Props = {
  stepEnabled: boolean,
  shouldPassValidation: boolean,
};

const StepTwo = ({ stepEnabled, shouldPassValidation }: Props) => {
  useEffect(() => {
    console.log('step 2 mounted');
  }, []);

  return (
    <Step
      name="step 2"
      autoSkip={!stepEnabled}
      validator={async () => {
        await someAsyncFunc(shouldPassValidation);
      }}>
      <InputComponent placeholder="Step 2: Input state will NOT persist on step change" />
    </Step>
  );
};

export default StepTwo;
