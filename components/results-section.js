import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Grid } from 'react-styled-flexboxgrid';
import Tracks from './results-tracks';
import Albums from './results-albums';
import Artists from './results-artists';

const Title = styled.h3`
  color: #a6acc1;
  font-family: ${props => props.theme.font.title};
  font-size: .9em;
  margin: 1rem 0;
`;

function Section({ title, data, kind }) {
  return (
    <Grid>
      <Title>{title}</Title>
      {kind === 'tracks' &&
        <Tracks data={data} />
      }
      {kind === 'albums' &&
        <Albums data={data} />
      }
      {kind === 'artists' &&
        <Artists data={data} />
      }
    </Grid>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(['tracks', 'albums', 'artists']).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Section;
