import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const AlbumUI = styled.div`
  padding: 1em 0;
  display: flex;
`;

const Name = styled.p`
  display: flex;
  flex-direction: column;
  flex: 1;
  strong {
    color: ${props => props.theme.color.grayC};
  }
`;

const Detail = styled.div`
  margin-left: 1em;
  flex: 1;
`;

function Album(props) {
  return (
    <AlbumUI>
      <img
        src={props.image}
        alt={props.name}
        width="70"
        height="70"
      />
      <Detail>
        <Name>
          <strong>{props.name}</strong>
          <span>{props.albumName}</span>
        </Name>
      </Detail>
    </AlbumUI>
  );
}

Album.propTypes = {
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    image: state.get('album').get('image'),
    albumName: state.get('album').get('name'),
  };
}

export default connect(mapStateToProps)(Album);
