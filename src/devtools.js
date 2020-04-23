/**
 * Simple decorator for getting Redux-devtools-like logging capabilities.
 * Inspired by https://github.com/LogRocket/redux-logger
 *
 * Only works if the user agent supports `console.group`
 */

export function loggingDecorator(reducer) {
  /* eslint-disable no-console */
  if (!console.group) {
    return reducer;
  }
  const reducerWithLogger = (state, action) => {
    console.groupCollapsed(action.type);
    console.log(
      '%cPrevious State:',
      'color: #9E9E9E; font-weight: 700;',
      state,
    );
    console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
    console.log(
      '%cNext State:',
      'color: #47B04B; font-weight: 700;',
      reducer(state, action),
    );
    console.groupEnd(action.type);
    /* eslint-enable no-console */
    return reducer(state, action);
  };
  return reducerWithLogger;
}
