import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

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

function Album(props) {
  return (
    <Item xs={6} sm={3} md={2}>
      <Thumb src={item.images[0].url} />
      <Title>{item.artists[0].name}</Title>
      <Text>{item.name}</Text>
    </Item>
  );
}

function AlbumList({ data }) {
  return (
    <Grid>
      <Row>
        {data.map(item => (
          <Album key={item.id} {...item} />
        ))}
      </Row>
    </Grid>
  );
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

AlbumList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(Album.propTypes)
  ).isRequired,
};

export default AlbumList;
