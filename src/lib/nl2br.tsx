import { createElement, ReactChild } from 'react';

// yosuke-furukawa/react-nl2br: Newlines to <br /> for React https://github.com/yosuke-furukawa/react-nl2br

const newlineRegex = /(\r\n|\r|\n)/g;

const nl2br = (str: string): ReactChild[] => {
  return str.split(newlineRegex).map((line, index) => {
    if (line.match(newlineRegex)) {
      return createElement('br', { key: index });
    }
    return line;
  });
};

export default nl2br;
