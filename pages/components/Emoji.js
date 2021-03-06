// @flow
import React from 'react';

type Props = {
  emoji: string,
};

const Emoji = ({ emoji, ...rest }: Props) => (
  <span className="f3" role="img" aria-label="emoji" {...rest}>
    {emoji}
  </span>
);

export default Emoji;
