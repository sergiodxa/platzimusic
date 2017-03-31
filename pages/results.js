import React, { Component, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import fetch from 'isomorphic-fetch';
import { format } from 'url';
import withRedux from 'next-redux-wrapper';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import Router from 'next/router';
import Hero from '../components/hero';
import Form from '../components/form';
import Section from '../components/results-section';
import theme from '../lib/theme';
import Player from '../components/player';
import reducer from '../reducers/index';

const dev = process.env.NODE_ENV !== 'production';

const data = {
  playlist: [],
  currentTrack: 0,
};

const makeStore = (initialState = data) => {
  return createStore(reducer, fromJS(initialState));
}

async function search(url) {
  const response = await fetch(url);
  return {
    payload: await response.json(),
  };
}

class ResultsPage extends Component {
  static async getInitialProps({ store, query }) {
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
    const action = await search(url);
    store.dispatch({
      type: 'SET_SEARCH',
      payload: {
        data: action.payload,
      },
    });

    return { ...action.payload };
  }

  static childContextTypes = {
    setTrack: PropTypes.func,
  };
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
  };
  state = {
    currentTrack: false,
  }
  getChildContext() {
    return {
      setTrack: this.setTrack,
    };
  }
  setTrack = (track) => {
    this.setState({
      currentTrack: track,
    });
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
          {
            this.state.currentTrack &&
            <Player
              visible
              {...this.state.currentTrack}
            />
          }

          <Player
            visible
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default withRedux(makeStore)(ResultsPage);
