// @flow
import React, { useState, useEffect, useCallback } from 'react';

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
  const [index, setIndex] = useState<number | null>(null);
  const [steps, setSteps] = useState<Array<Losen$Step>>([]);
  const [validSteps, setValidSteps] = useState<Array<boolean>>([]);
  const [isLoading, setLoadingState] = useState(false);

  function registerStep(step) {
    const alreadyRegistered = steps.map(el => el.name).includes(step.name);
    if (!alreadyRegistered) {
      setSteps(previousSteps => [...previousSteps, step]);
      setValidSteps(previousSteps => [...previousSteps, true]);
    }
  }

  function updateStep(step) {
    const stepIndex = steps.findIndex(el => el.name === step.name);
    if (stepIndex == -1) {
      registerStep(step);
    } else {
      setSteps(previousSteps => [
        ...previousSteps.slice(0, stepIndex),
        step,
        ...previousSteps.slice(stepIndex + 1),
      ]);
    }
  }

  function updateValidSteps(stepIndex, isValid) {
    setValidSteps(previousSteps => [
      ...previousSteps.slice(0, stepIndex),
      isValid,
      ...previousSteps.slice(stepIndex + 1),
    ]);
  }

  async function onNext() {
    if (index === null) {
      return;
    }
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
        updateValidSteps(index, true);
        nextAction();
      } catch (error) {
        updateValidSteps(index, false);
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
      if (index !== steps.length - 1) {
        const nextStep = steps[index + 1];
        stateManager.updateStep(currentStep.name, nextStep.name);
      }
    }
  }

  function onPrevious() {
    if (index === null) {
      return;
    }
    const prev = findPreviousValid(steps, index);
    setIndex(prev);

    if (stateManager) {
      const currentStep = steps[index];
      if (index > 0) {
        const previousStep = steps[index - 1];
        stateManager.updateStep(currentStep.name, previousStep.name);
      }
    }
  }

  const onLoad = useCallback(() => {
    if (stateManager) {
      const activeStep = stateManager.getActiveStep();
      let activeIndex = steps.findIndex(step => step.name === activeStep);
      activeIndex = activeIndex > -1 ? activeIndex : null;
      setIndex(activeIndex);
    } else if (index === null) {
      setIndex(0);
    }
  }, [index, stateManager, steps]);

  useEffect(() => {
    // for debugging purposes only
    if (debug) {
      console.debug('steps updated', steps); // eslint-disable-line
    }

    window.addEventListener('popstate', () => {
      onLoad();
    });

    onLoad();
  }, [steps, debug, stateManager, onLoad]);

  return (
    <ControlsContext.Provider
      value={{
        onNext,
        onPrevious,
        isLoading,
        isFirst:
          index !== null ? findPreviousValid(steps, index) === index : false,
        isLast: index !== null ? findNextValid(steps, index) === index : false,
        activeIndex: index,
        isStepValid: index !== null && validSteps ? validSteps[index] : true,
      }}>
      <StepContext.Provider
        value={{
          registerStep,
          activeStep: index === null ? { name: '' } : steps[index],
          initialized: index === null ? false : !!steps[index],
          updateStep,
          stateManager,
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
