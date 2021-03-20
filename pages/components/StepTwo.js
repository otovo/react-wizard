// @flow
import React, { useEffect } from 'react';
import { Step } from '../../src';
import InputComponent from './InputComponent';
import { someAsyncFunc } from './asyncMock';

type Props = {
  stepEnabled: boolean,
};

const StepTwo = ({ stepEnabled }: Props) => {
  useEffect(() => {
    console.log('step 2 mounted');
  }, []);

  return (
    <Step
      name="step 2"
      autoSkip={!stepEnabled}
      validator={async () => {
        await someAsyncFunc();
        console.log('waiting for timeout done');
      }}>
      <InputComponent name="step 2" />
    </Step>
  );
};

export default StepTwo;
