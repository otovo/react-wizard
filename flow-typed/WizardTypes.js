// @flow

type Losen$StepTypes = 'next' | 'previous' | 'complete';
export type Losen$Direction = ?Losen$StepTypes;

export type Losen$ValidatorFunction = () => Promise<React$Node>;

declare type Losen$Step = {|
  name: string,
  validator: ?Losen$ValidatorFunction,
  autoSkip: ?boolean,
  state: ?Array<{| [string]: string |}>,
|};

declare type Losen$State = {|
  index: number,
  steps: Array<Losen$Step>,
  isLoading: boolean,
|};
