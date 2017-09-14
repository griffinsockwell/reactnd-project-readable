// node_modules
import React from 'react';
import styled from 'styled-components';
// common
import Loading from '../common/Loading';

const StyledSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 44px;
  background-color: #ff7a37;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  transition: all 0.2s;
  span {
    margin: 0 10px;
  }
  :hover {
    background-color: #e66e32;
  }
  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const FormSubmit = props => {
  return (
    <StyledSubmit type="submit" disabled={props.disabled}>
      <span>{props.text}</span>
      {props.submitting && <Loading color="#fff" />}
    </StyledSubmit>
  );
};

export default FormSubmit;
