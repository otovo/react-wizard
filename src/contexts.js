// @flow
import { createContext, useContext } from 'react';

export const StateContext = createContext<Object>(null);
export const ActionContext = createContext<Object>(null);

export function useStateContext() {
  const context = useContext(StateContext);

  if (context === 'undefined') {
    throw new Error('useStateContext must be wrapped in a WizardProvider');
  }

  return context;
}

export function useActionContext() {
  const context = useContext(ActionContext);

  if (context === 'undefined') {
    throw new Error('useActionContext must be wrapped in a WizardProvider');
  }

  return context;
}
