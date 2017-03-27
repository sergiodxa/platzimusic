import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import Form from '../components/form';
import Hero from '../components/hero';
import theme from '../lib/theme';
import '../components/fonts.js';
import AppShell from '../components/app-shell';

export default class HomePage extends Component {
  state = {
    loading: false,
  }
  handleSubmit = (event) => {
    this.setState({
      loading: true,
    });
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
        <div>
          <Hero small={this.state.loading}>
            <Form onSubmit={this.handleSubmit} />
          </Hero>
          {
            this.state.loading &&
            <AppShell />
          }
        </div>
      </ThemeProvider>
    );
  }
}
