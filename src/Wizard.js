// @flow
import React, { useMemo } from 'react';

import useThunkReducer from 'react-hook-thunk-reducer';

import { findNextValid, findPreviousValid } from './utils';
import { StateContext, ActionContext } from './contexts';
import { reducer, initialState } from './state';
import { loggingDecorator } from './devtools';
import { registerStep, updateStep, onPrevious, onNext } from './actions';

export class ValidationError extends Error {}

type Props = {|
  onComplete: (currentStep: string) => void,
  children: React$Node,
  debug?: boolean,
|};

const Wizard = ({ children, onComplete, debug }: Props) => {
  const [state, dispatch] = useThunkReducer(
    debug ? loggingDecorator(reducer) : reducer,
    initialState,
  );

  const actions = useMemo(
    () => ({
      registerStep: step => dispatch(registerStep(step)),
      updateStep: step => dispatch(updateStep(step)),
      onPrevious: () => dispatch(onPrevious()),
      onNext: () => dispatch(onNext(onComplete)),
    }),
    [onComplete],
  );

  // Store state + derived state
  const mergedState = useMemo(
    () => ({
      ...state,
      activeIndex: state.index,
      activeStep: state.steps[state.index] || {},
      initialized: !!state.steps[state.index],
      isFirst: findPreviousValid(state.steps, state.index) === state.index,
      isLast: findNextValid(state.steps, state.index) === state.index,
    }),
    [state],
  );

  return (
    <ActionContext.Provider value={actions}>
      <StateContext.Provider value={mergedState}>
        {children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};

Wizard.defaultProps = {
  debug: false,
};
export default Wizard;
