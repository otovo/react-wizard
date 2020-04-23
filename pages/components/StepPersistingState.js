// @flow
import React, { useState, useEffect } from 'react';

import { Step } from '../../src';

/**
 * This step will persist state when
 * toggling back and forth between steps.
 */

const StepPersistingState = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('step 3 mounted');
  }, []);

  return (
    <Step name="step 3">
      <textarea
        className="w-100 h3"
        placeholder="Step 3: This step will persist the input state"
        value={text}
        onChange={ev => setText(ev.target.value)}
      />
    </Step>
  );
};

export default StepPersistingState;
