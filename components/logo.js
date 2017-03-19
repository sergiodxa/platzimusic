import React, { PropTypes } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

function getFontSize({ small }) {
  if (small) return '1.5em';
  return '3em';
}

const Title = styled.h1`
  font-family: ${props => props.theme.font.title};
  font-size: ${getFontSize};
  margin: 1rem 0;
  & a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
  }
  & strong {
    color: white;
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 1.125em;
  font-family: ${props => props.theme.font.title};
  font-weight: normal;
  text-align: center;
`;

function Logo({ small }) {
  return (
    <div>
      <Title small={small}>
        <Link href="/">
          <a><strong>Platzi</strong>Music</a>
        </Link>
      </Title>
      {!small &&
        <Subtitle>
          Tu música sin límites
        </Subtitle>
      }
    </div>
  );
}

Logo.propTypes = {
  small: PropTypes.bool,
};

Logo.defaultProps = {
  small: false,
};

export default Logo;
