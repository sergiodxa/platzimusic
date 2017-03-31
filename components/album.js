import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

const Item = styled(Col)`
  margin-bottom: 1em;
`;

const Thumb = styled.img`
  width: 155px;
  max-width: 100%;
`;

const Title = styled.h4`
  font-family: ${props => props.theme.font.title};
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const Text = styled.p`
  color: #4b4e5a;
  font-family: ${props => props.theme.font.title};;
  font-size: .9rem;
  margin: 0;
`;


class Album extends Component {
  async search(url) {
    const response = await fetch(url);
    return {
      payload: await response.json(),
    };
  }
  handleClick = (event) => {
    console.log('click')
    const action = this.search(this.props.href);
    this.props.dispatch({
      type: 'SET_ALBUM_DATA',
      payload: {
        data: {
          image: this.props.images[0].url,
          name: this.props.name,
        },
      },
    });
    action.then((data) => {
      this.props.dispatch({
        type: 'SET_PLAYLIST',
        payload: {
          data: data.payload.tracks.items
        }
      })
    })
  }
  render() {
    return (
      <Item xs={6} sm={3} md={2} onClick={this.handleClick}>
        <Thumb src={this.props.images[0].url} />
        <Title>{this.props.artists[0].name}</Title>
        <Text>{this.props.name}</Text>
      </Item>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
  })).isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  name: PropTypes.string.isRequired,
}


export default connect(null)(Album);
