import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';

export const Input = styled.input`
  border: none;
  border-radius: .25em;
  font-size: 1em;
  padding: .5em 1em;
  outline: none;
  margin: 1em 0;
  width: 100%;

  &:focus {
    box-shadow: 0 0 1.5em #5179ff;
  }
`;

export const Button = styled.button`
  background-color: #ea83ee;
  border: none;
  border-radius: .25em;
  box-shadow: 0 .25em .5em 0 rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  padding: .5em 2.75em;
  text-align: center;
  margin: 1em 0;
  &:active {
    box-shadow: 0 .5em 1em 0 rgba(0, 0, 0, 0.3);
  }
`;

function Form({ defaultValue, onSubmit }) {
  return (
    <form onSubmit={onSubmit} method="GET" action="/results">
      <Row center="xs">
        <Col xs={11} sm={8}>
          <Input
            name="query"
            defaultValue={defaultValue}
            autoFocus
            type="search"
            placeholder="Busca por canción, artista o album"
          />
        </Col>
        <Col xs={11} sm={2}>
          <Button>Buscar</Button>
        </Col>
      </Row>
    </form>
  );
}

Form.propTypes = {
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  defaultValue: '',
};

export default Form;
