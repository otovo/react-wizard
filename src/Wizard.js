// @flow
import React, { useState, useEffect } from 'react';

import { findNextValid, findPreviousValid } from './utils';
import { ControlsContext } from './Controls';
import { StepContext } from './Step';

export class ValidationError extends Error {}

type Props = {|
  onComplete: (currentStep: string) => void,
  children: React$Node,
  debug?: boolean,
  stateManager?: Losen$StateManager,
|};

const Wizard = ({ children, onComplete, stateManager, debug }: Props) => {
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState<Array<Losen$Step>>([]);
  const [isLoading, setLoadingState] = useState(false);

  function registerStep(step) {
    const alreadyRegistered = steps.map(el => el.name).includes(step.name);
    if (!alreadyRegistered) {
      setSteps(previousSteps => [...previousSteps, step]);
    }
  }

  function updateStep(step) {
    const stepIndex = steps.findIndex(el => el.name === step.name);
    setSteps(previousSteps => [
      ...previousSteps.slice(0, stepIndex),
      step,
      ...previousSteps.slice(stepIndex + 1),
    ]);
  }

  async function onNext() {
    const { validator } = steps[index];
    const next = findNextValid(steps, index);

    const nextAction =
      next === index
        ? () => onComplete(steps[index].name)
        : () => setIndex(next);

    if (validator) {
      try {
        setLoadingState(true);
        await validator();
        nextAction();
      } catch (error) {
        if (error instanceof ValidationError) {
          console.error('ReactLosen', error); // eslint-disable-line
        } else {
          throw error;
        }
      } finally {
        setLoadingState(false);
      }
    } else {
      nextAction();
    }

    if (stateManager) {
      const currentStep = steps[index];
      const nextStep = steps[index + 1];
      stateManager.updateStep(currentStep.name, nextStep.name);
    }
  }

  function onPrevious() {
    const prev = findPreviousValid(steps, index);
    setIndex(prev);

    if (stateManager) {
      const currentStep = steps[index];
      const previousStep = steps[index - 1];
      stateManager.updateStep(currentStep.name, previousStep.name);
    }
  }

  useEffect(() => {
    // for debugging purposes only
    if (debug) {
      console.debug('steps updated', steps); // eslint-disable-line
    }

    if (stateManager) {
      const activeStep = stateManager.getActiveStep();
      const activeIndex = steps.findIndex(step => step.name === activeStep);
      if (activeIndex > -1) {
        setIndex(activeIndex);
      }
    }
  }, [steps, debug, stateManager]);

  return (
    <ControlsContext.Provider
      value={{
        onNext,
        onPrevious,
        isLoading,
        isFirst: findPreviousValid(steps, index) === index,
        isLast: findNextValid(steps, index) === index,
        activeIndex: index,
      }}>
      <StepContext.Provider
        value={{
          registerStep,
          activeStep: steps[index] || {},
          initialized: !!steps[index],
          updateStep,
        }}>
        {children}
      </StepContext.Provider>
    </ControlsContext.Provider>
  );
};

Wizard.defaultProps = {
  debug: false,
  stateManager: undefined,
};
export default Wizard;
