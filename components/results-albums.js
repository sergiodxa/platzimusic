import React, { PropTypes } from 'react';
import { Grid, Row } from 'react-styled-flexboxgrid';
import Album from './album';

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


AlbumList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(Album.propTypes),
  ).isRequired,
};

export default AlbumList;
