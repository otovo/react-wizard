// @flow
import React, { useState } from 'react';

import { Wizard, Step } from '../../src';
// import { UrlStateManager } from '../../src/state-managers/url-state-manager';
import Controls from './Controls';
import StepPersistingState from './StepPersistingState';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { someAsyncFunc } from './asyncMock';
import Emoji from './Emoji';
import Button from './Button';

const WizardExample = () => {
  const [stepEnabled, setEnabledStep] = useState(true);
  const [passValidation, setPassValidation] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  function onComplete(step) {
    setIsComplete(true);
    console.log('Wizard completed ', step);
  }

  if (isComplete) {
    return (
      <div className="tc">
        <h2>
          Wizard completed <Emoji emoji="🎉" />
        </h2>
        <Button onClick={() => setIsComplete(false)}>Start over</Button>
      </div>
    );
  }

  return (
    <>
      <Wizard
        onComplete={onComplete}
        // stateManager={UrlStateManager}
        debug>
        <div>
          <StepOne />
          <StepTwo
            shouldPassValidation={passValidation}
            stepEnabled={stepEnabled}
          />

          <StepPersistingState />

          <Step name="step 4" validator={someAsyncFunc}>
            <div className="tc">
              <h2 className="f3">Final step</h2>
              <img alt="Dog" src="https://placedog.net/500" />
              <p>This is dog</p>
            </div>
          </Step>
        </div>

        <Controls />
      </Wizard>

      <hr />

      <div className="ph4 pv3 courier bg-black-05">
        <h3 className="db mt0">Debug panel</h3>
        <label htmlFor="step-2-checkbox">
          <input
            id="step-2-checkbox"
            className="mr2 inline-flex"
            type="checkbox"
            checked={stepEnabled}
            onChange={() => setEnabledStep(prev => !prev)}
          />
          Step 2 enabled
        </label>
        <label htmlFor="step-2-pass-validation" className="db">
          <input
            id="step-2-pass-validation"
            className="mr2 inline-flex"
            type="checkbox"
            checked={passValidation}
            onChange={() => setPassValidation(prev => !prev)}
          />
          Step 2 passes validation
        </label>
      </div>
    </>
  );
};

export default WizardExample;
