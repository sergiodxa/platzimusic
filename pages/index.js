import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import Form from '../components/form';
import Hero from '../components/hero';
import theme from '../lib/theme';

export default class extends Component {
  handleSubmit = (event) => {
    event.preventDefault();

    Router.push({
      pathname: event.target.action,
      query: {
        query: event.target[0].value,
      },
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Hero>
          <Form onSubmit={this.handleSubmit} />
        </Hero>
      </ThemeProvider>
    );
  }
}
