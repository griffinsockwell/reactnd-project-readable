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
  select {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 44px;
    font-size: 16px;
    background-color: #fff;
  }
  option:disabled {
    color: #9b9b9b;
  }
`;

const FormSelect = props => {
  return (
    <StyledFormGroup>
      <label htmlFor={props.htmlFor}>Category</label>
      <select id={props.htmlFor} value={props.value} onChange={props.onChange}>
        <option value="none" disabled>
          Select...
        </option>
        {props.categories.map(category => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </StyledFormGroup>
  );
};

export default FormSelect;
