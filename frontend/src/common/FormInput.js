import React from 'react';
import styled from 'styled-components';

const StyledFormGroup = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #4a4a4a;
  }
  input {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 44px;
    padding-left: 10px;
    font-size: 16px;
  }
`;

const FormInput = props => {
  return (
    <StyledFormGroup>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        type="text"
        id={props.htmlFor}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </StyledFormGroup>
  );
};

export default FormInput;
