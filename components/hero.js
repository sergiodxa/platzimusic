import React, { PropTypes } from 'react';
import { Grid } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import Logo from './logo';

function getMinHeight(props) {
  if (props.small) return 'auto';
  return '100vh';
}

const Wrapper = styled.div`
  background-image: linear-gradient(to left, #5179ff, #e983ee);
  text-align: center;
  display: flex;
  align-items: center;
  min-height: ${getMinHeight};
`;

function Hero({ children, small }) {
  return (
    <Wrapper small={small}>
      <Grid>
        <Logo small={small} />
        {children}
      </Grid>
    </Wrapper>
  );
}

Hero.propTypes = {
  children: PropTypes.element.isRequired,
  small: PropTypes.bool,
};

Hero.defaultProps = {
  small: false,
};

export default Hero;
