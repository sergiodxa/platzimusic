import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';

const animation = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
`;

const Item = styled(Row)`
  margin: .5rem;
  position: relative;
  background:  orange;
  height: 75px;
  background: #e9eaed;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    height: inherit;
    width: 100%;
    background-size: 800px 104px;
    background-image: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    animation: ${animation} 1s infinite linear;
  }
`;


const FakeContent = styled.div`
  background: white;
  height: 75px;
  width: 10px;
  position: relative;
  z-index: 2;
`;

const list = new Array(10).fill({});

function AppShell() {
  return (
    <Grid>
      {
        list.map((item, index) => (
          <Item middle="xs" key={index}>
            <Col xs={3} sm={2} md={1}>
              <FakeContent />
            </Col>
            <Col xs={9} sm={4}>
              <FakeContent />
            </Col>
            <Col xs={11} sm={5}>
              <FakeContent />
            </Col>
            <Col xs={1} sm={1}>
              <FakeContent />
            </Col>
          </Item>
        ))
      }
    </Grid>
  );
}

export default AppShell;
