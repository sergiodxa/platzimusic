import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

const Item = styled(Col)`
  margin-bottom: 1em;
`;

const Thumb = styled.img`
  height: 125px;
  width: 125px;
`;

const Title = styled.h4`
  font-family: ${props => props.theme.font.title};
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

function Artists({ data }) {
  return (
    <Grid>
      <Row>
        {data.map((item) => {
          if (!item.images[0]) return null;
          return (
            <Item xs={6} sm={3} md={2} key={item.id}>
              <Thumb src={item.images[0].url} />
              <Title>{item.name}</Title>
            </Item>
          );
        })}
      </Row>
    </Grid>
  );
}

Artists.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Artists;
