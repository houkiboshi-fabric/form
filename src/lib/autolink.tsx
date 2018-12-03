import React, { ReactChild, ReactText } from 'react';

type Replace = (v: ReactChild) => ReactChild | Array<ReactText | ReactChild>;

const pattern = /(https?:\/\/[^ $]+)/g;
const imagePattern = /\.(jpg|jpeg|png|gif|webp)$/i;
const MAX_LABEL_LENGTH = 32;

const truncate = (str: string, length: number) => {
  return str.length <= length ? str : `${str.substr(0, length)}...`;
};

const replace: Replace = (
  v: ReactChild
): ReactChild | Array<ReactText | ReactChild> => {
  if (typeof v !== 'string') {
    return v;
  }
  return v.split(pattern).map((str: string, i: number) => {
    if (i % 2 === 0) {
      return str;
    }

    const label = str.replace(/https?:\/\//i, '').replace(/\/$/, '');

    if (imagePattern.test(str)) {
      const style = {
        maxWidth: '100%'
      };
      return (
        <a href={str} target="_blank" key={i}>
          <img src={str} alt={label} style={style} />
        </a>
      );
    }

    return (
      <a href={str} target="_blank" key={i}>
        {truncate(label, MAX_LABEL_LENGTH)}
      </a>
    );
  });
};

const autolink = (value: ReactChild | ReactChild[]) => {
  if (!value) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(replace);
  }

  return replace(value);
};

export default autolink;
