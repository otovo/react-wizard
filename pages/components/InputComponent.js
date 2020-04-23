// @flow
import React, { useState } from 'react';

type Props = {
  placeholder: string,
};

const InputComponent = ({ placeholder }: Props) => {
  const [text, setText] = useState('');
  return (
    <textarea
      className="w-100 h3"
      placeholder={placeholder}
      value={text}
      onChange={ev => setText(ev.target.value)}
    />
  );
};

export default InputComponent;
