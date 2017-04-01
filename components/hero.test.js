/* global it, expect, describe */
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import Hero from './hero';
import theme from '../lib/theme';

describe('Test Hero component', () => {
  it('should render without small', () => {
    const div = document.createElement('div');
    render(
      <ThemeProvider theme={theme}>
        <Hero>
          <div>testing without small</div>
        </Hero>
      </ThemeProvider>,
      div,
    );
  });

  it('should render with small', () => {
    const div = document.createElement('div');
    render(
      <ThemeProvider theme={theme}>
        <Hero small>
          <div>testing with small</div>
        </Hero>
      </ThemeProvider>,
      div,
    );
  });

  it('should render without small the expected HTML', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Hero>
          <div>testing without small</div>
        </Hero>
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with small the expected HTML', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Hero small>
          <div>testing with small</div>
        </Hero>
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
