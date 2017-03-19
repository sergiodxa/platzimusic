import React, { Component, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import fetch from 'isomorphic-fetch';
import { format } from 'url';
import Router from 'next/router';
import Hero from '../components/hero';
import Form from '../components/form';
import Section from '../components/results-section';
import theme from '../lib/theme';

const dev = process.env.NODE_ENV !== 'production';

export default class ResultsPage extends Component {
  static async getInitialProps({ query }) {
    const url = format({
      protocol: dev ? 'http' : 'https',
      hostname: dev ? 'localhost' : 'platzi-music.now.sh',
      port: dev ? 3000 : 443,
      pathname: 'api',
      query: {
        q: query.query,
        type: 'album,track,artist',
      },
    });

    const response = await fetch(url);

    const data = await response.json();

    return {
      ...data,
    };
  }

  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.shape({
        query: PropTypes.string,
      }),
    }).isRequired,
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    albums: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    artists: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }

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
        <div>
          <Hero small>
            <Form
              onSubmit={this.handleSubmit}
              defaultValue={this.props.url.query.query}
            />
          </Hero>

          <Section
            title="Canciones"
            data={this.props.tracks.items}
            kind="tracks"
          />

          <Section
            title="Albumes"
            data={this.props.albums.items}
            kind="albums"
          />

          <Section
            title="Artistas"
            data={this.props.artists.items}
            kind="artists"
          />
        </div>
      </ThemeProvider>
    );
  }
}
