import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

const Item = styled(Col)`
  margin-bottom: 1em;
`;

const Thumb = styled.img`
  height: 155px;
  width: 155px;
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

function Albums({ data }) {
  return (
    <Grid>
      <Row>
        {data.map(item => (
          <Item md={2} key={item.id}>
            <Thumb src={item.images[0].url} />
            <Title>{item.artists[0].name}</Title>
            <Text>{item.name}</Text>
          </Item>
        ))}
      </Row>
    </Grid>
  );
}

Albums.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
    artists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Albums;
