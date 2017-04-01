/* global it, expect, describe */
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import Form from './form';
import theme from '../lib/theme';

function handleSubmit() {}

describe('Test Form component', () => {
  it('should render without default value', () => {
    const div = document.createElement('div');
    render(
      <ThemeProvider theme={theme}>
        <Form onSubmit={handleSubmit} />
      </ThemeProvider>,
      div,
    );
  });

  it('should render with default value', () => {
    const div = document.createElement('div');
    render(
      <ThemeProvider theme={theme}>
        <Form defaultValue="Testing" onSubmit={handleSubmit} />
      </ThemeProvider>,
      div,
    );
  });

  it('should render without default value the expected HTML', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Form onSubmit={handleSubmit} />
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with default value the expected HTML', () => {
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <Form defaultValue="Testing" onSubmit={handleSubmit} />
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
