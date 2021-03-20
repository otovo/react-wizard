// @flow
import { createContext, useContext } from 'react';

export const ControlsContext = createContext<Object>(null);

type Props = {|
  render: (
    onNext: Function,
    onPrevious: Function,
    isFirst: boolean,
    isLast: boolean,
    isLoading: boolean,
    activeIndex: number,
    isStepValid: boolean,
  ) => React$Node,
|};

const Controls = ({ render }: Props) => {
  const {
    onNext,
    onPrevious,
    isFirst,
    isLast,
    isLoading,
    activeIndex,
    isStepValid,
  } = useContext(ControlsContext);

  return render(
    onNext,
    onPrevious,
    isFirst,
    isLast,
    isLoading,
    activeIndex,
    isStepValid,
  );
};

export default Controls;
