import React, { PropTypes } from 'react';
import { Grid } from 'react-styled-flexboxgrid';
import Track from './track';

function TrackList({ data }) {
  return (
    <Grid>
      {data.map(item => (
        <Track key={item.id} {...item} />
      ))}
    </Grid>
  );
}

TrackList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(Track.propTypes),
  ).isRequired,
};

export default TrackList;
