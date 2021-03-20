// @flow
import React, { useState, useEffect } from 'react';

import { Step } from '../../src';

const StepWithInput = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('step 3 mounted');
  }, []);
  return (
    <Step name="step 3">
      <textarea
        className="w-100 h3"
        placeholder="Step 3: Write something"
        value={text}
        onChange={ev => setText(ev.target.value)}
      />
    </Step>
  );
};

export default StepWithInput;
