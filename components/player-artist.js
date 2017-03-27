import React from 'react';
import styled from 'styled-components';

const Artist = styled.div`
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

function PlayerArtist(props) {
  return (
    <Artist>
      <img
        src={props.album.images[0].url}
        alt={props.name}
        width="70"
        height="70"
      />
      <Detail>
        <Name>
          <strong>{props.name}</strong>
          <span>{props.album.name}</span>
        </Name>
      </Detail>
    </Artist>
  );
}

export default PlayerArtist;
