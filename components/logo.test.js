/* global it, expect, describe */
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import Logo from './logo';
import theme from '../lib/theme';

describe('Test Logo component', () => {
  it('should render without small', () => {
    const div = document.createElement('div');
    render(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>,
      div,
    );
  });

  it('should render with small', () => {
    const div = document.createElement('div');
    render(
      <ThemeProvider theme={theme}>
        <Logo small />
      </ThemeProvider>,
      div,
    );
  });

  it('should render without small the expected HTML', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with small the expected HTML', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Logo small />
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
