import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

const Item = styled(Row)`
  border-bottom: 1px solid #e1e5f0;
  margin: .5rem;
`;

const Thumb = styled.img`
  width: 70px;
  max-width: 100%;
`;

const Title = styled.h4`
  font-family: ${props => props.theme.font.title};
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

Title.defaultProps = {
  align: 'inherit',
};

const Text = styled.p`
  color: #4b4e5a;
  font-family: ${props => props.theme.font.title};;
  font-size: .9rem;
  margin: 0;
  text-align: ${props => props.align};
`;

const formatTime = ms => parseFloat(ms / 1000 / 60).toFixed(2).toString().replace('.', ':');

function Track(props) {
  return (
    <Item middle="xs">
      <Col xs={3} sm={2} md={1}>
        <Thumb src={props.album.images[0].url} />
      </Col>
      <Col xs={9} sm={4}>
        <Title>{props.name}</Title>
      </Col>
      <Col xs={11} sm={5}>
        <Text>{props.album.name}</Text>
      </Col>
      <Col xs={1} sm={1}>
        <Text align="center">{formatTime(props.duration_ms)}</Text>
      </Col>
    </Item>
  );
}

function TrackList({ data }) {
  return (
    <Grid>
      {data.map(item => (
        <Track key={item.id} {...item} />
      ))}
    </Grid>
  );
}

Track.propTypes = {
  id: PropTypes.string.isRequired,
  albums: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  album: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  duration_ms: PropTypes.number.isRequired,
};

TrackList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(Track.propTypes)
  ).isRequired,
};

export default TrackList;
