// @flow
import { useActionContext, useStateContext } from './contexts';

type Props = {|
  render: (
    onNext: Function,
    onPrevious: Function,
    isFirst: boolean,
    isLast: boolean,
    isLoading: boolean,
    activeIndex: number,
  ) => React$Node,
|};

const Controls = ({ render }: Props) => {
  const { isFirst, isLast, isLoading, activeIndex } = useActionContext();
  const { onNext, onPrevious } = useStateContext();

  return render(onNext, onPrevious, isFirst, isLast, isLoading, activeIndex);
};

export default Controls;
