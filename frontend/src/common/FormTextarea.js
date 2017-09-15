import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFormGroup = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #4a4a4a;
  }
  textarea {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: ${props => (props.large ? '132px' : '88px')};
    padding: 10px;
    font-size: 16px;
    resize: vertical;
  }
`;

const FormTextarea = props => (
  <StyledFormGroup large={props.large}>
    <label htmlFor={props.htmlFor}>{props.label}</label>
    <textarea
      id={props.htmlFor}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  </StyledFormGroup>
);

FormTextarea.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  large: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default FormTextarea;
