// @flow
import { useEffect } from 'react';
import { useStateContext, useActionContext } from './contexts';

type Props = {|
  children: React$Node,
  ...Losen$Step,
|};

const Step = ({ children, name, validator, autoSkip, state }: Props) => {
  const { activeStep, initialized, stateManager } = useStateContext();
  const { registerStep, updateStep } = useActionContext();

  useEffect(() => {
    if (!initialized) {
      registerStep({
        name,
        validator,
        autoSkip,
      });
    }
  }, [name, validator, autoSkip, initialized, registerStep]);

  useEffect(() => {
    if (initialized) {
      updateStep({
        name,
        validator,
        autoSkip,
      });
    }
  }, [autoSkip, validator, initialized, name, updateStep]);

  useEffect(() => {
    if (state && stateManager) {
      state.forEach(item => {
        const [key, value] = Object.entries(item)[0];
        stateManager.setItem(key, value);
      });
    }
  }, [state, stateManager]);

  if (activeStep.name !== name) {
    return null;
  }

  return children;
};

Step.defaultProps = {
  validator: null,
  autoSkip: false,
  state: null,
};

export default Step;
