import React, { createElement } from 'react';
import { shallow } from 'enzyme';

import autolink from '../../src/lib/autolink';

const TEXT =
  'Sample text. https://example.com/ Sample text. https://example.com/ ';
const TEXT_IMAGE =
  'Sample text. https://example.com/foo.png Sample text. https://example.com/bar.jpg';

describe('autolink', () => {
  const wrapperText = shallow(<div>{autolink(TEXT)}</div>);

  test('should parse URIs as anchor elements', () => {
    expect(wrapperText.find('a')).toHaveLength(2);
    wrapperText.find('a').forEach(a => {
      expect(a.prop('href')).toBe('https://example.com/');
    });
  });

  test('should be labeled as shorten', () => {
    wrapperText.find('a').forEach(a => {
      expect(a.text()).toBe('example.com');
    });
  });

  const wrapperImage = shallow(<div>{autolink(TEXT_IMAGE)}</div>);

  test('should parse URIs as anchor elements that have img if URIs have image extensions', () => {
    expect(wrapperImage.find('a')).toHaveLength(2);
    expect(wrapperImage.childAt(0).text()).toBe('Sample text. ');
    expect(wrapperImage.childAt(1).type()).toBe('a');
    expect(wrapperImage.childAt(2).text()).toBe(' Sample text. ');
    expect(wrapperImage.childAt(3).type()).toBe('a');
    wrapperImage.find('a').forEach((a, i) => {
      const images = [
        'https://example.com/foo.png',
        'https://example.com/bar.jpg'
      ];
      expect(a.find('img')).toHaveLength(1);
      expect(a.prop('href')).toBe(images[i]);
    });
  });

  const wrapperEmptyArray = shallow(<div>{autolink([])}</div>);

  test('should return an empty string if the argument was an empty array', () => {
    expect(wrapperEmptyArray.text()).toBe('');
  });

  const wrapperComponent = shallow(
    <div>{autolink(createElement('p', null, ['https://example.com/']))}</div>
  );

  test('should do nothing if the argument was a React component', () => {
    expect(wrapperComponent.find('a')).toHaveLength(0);
    expect(wrapperComponent.find('p')).toHaveLength(1);
    expect(wrapperComponent.find('p').text()).toBe('https://example.com/');
  });
});
