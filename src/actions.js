// @flow
import { findNextValid } from './utils';

export const NEXT_STEP: 'NEXT_STEP' = 'NEXT_STEP';
export const PREVIOUS_STEP: 'PREVIOUS_STEP' = 'PREVIOUS_STEP';
export const REGISTER_STEP: 'REGISTER_STEP' = 'REGISTER_STEP';
export const UPDATE_STEP: 'UPDATE_STEP' = 'UPDATE_STEP';
export const VALIDATE_FAILED: 'VALIDATE_FAILED' = 'VALIDATE_FAILED';
export const VALIDATE_SUCCESS: 'VALIDATE_SUCCESS' = 'VALIDATE_SUCCESS';
export const VALIDATING_STEP: 'VALIDATING_STEP' = 'VALIDATING_STEP';
export const VALIDATION_COMPLETE: 'VALIDATION_COMPLETE' = 'VALIDATION_COMPLETE';
export const WIZARD_COMPLETED: 'WIZARD_COMPLETED' = 'WIZARD_COMPLETED';

export type Action =
  | { type: typeof NEXT_STEP, nextIndex: number }
  | { type: typeof PREVIOUS_STEP }
  | { type: typeof REGISTER_STEP, step: Losen$Step }
  | { type: typeof UPDATE_STEP, step: Losen$Step }
  | { type: typeof VALIDATE_FAILED }
  | { type: typeof VALIDATE_SUCCESS, nextIndex: number }
  | { type: typeof VALIDATING_STEP }
  | { type: typeof VALIDATION_COMPLETE }
  | { type: typeof WIZARD_COMPLETED };

type GetState = () => Losen$State;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any; // eslint-disable-line
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

class ValidationError extends Error {}

export function registerStep(step: Losen$Step) {
  return {
    type: REGISTER_STEP,
    step,
  };
}

export function updateStep(step: Losen$Step) {
  return {
    type: UPDATE_STEP,
    step,
  };
}

export function onPrevious() {
  return {
    type: PREVIOUS_STEP,
  };
  // if (stateManager) {
  //   const currentStep = steps[index];
  //   const previousStep = steps[index - 1];
  //   stateManager.updateStep(currentStep.name, previousStep.name);
  // }
}

function onComplete(completeFn) {
  return (dispatch, getState) => {
    const { steps, index } = getState();
    dispatch({ type: WIZARD_COMPLETED });
    completeFn(steps[index].name);
  };
}

export function onNext(completeFn: Function) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const { steps, index } = getState();
    const { validator } = steps[index];
    const nextIndex = findNextValid(steps, index);
    const isLastStep = nextIndex === index;

    if (!validator) {
      if (isLastStep) {
        return dispatch(onComplete(completeFn));
      }
      return dispatch({ type: NEXT_STEP, nextIndex });
    }

    try {
      dispatch({ type: VALIDATING_STEP });
      await validator();
      if (isLastStep) {
        return dispatch(onComplete(completeFn));
      }
      return dispatch({ type: VALIDATE_SUCCESS, nextIndex });
    } catch (error) {
      dispatch({ type: VALIDATE_FAILED, nextIndex });
      if (error instanceof ValidationError) {
        console.error('ReactLosen', error); // eslint-disable-line
      } else {
        throw error;
      }
    }
    return null;

    // if (stateManager) {
    //   const currentStep = steps[index];
    //   const nextStep = steps[index + 1];
    //   stateManager.updateStep(currentStep.name, nextStep.name);
  };
}
