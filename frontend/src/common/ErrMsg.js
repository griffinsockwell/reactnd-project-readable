import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: #fe5e78;
  span {
    margin-left: 4px;
  }
`;

const ErrMsg = props => (
  <StyledErrorMessage>
    <i className="material-icons">error_outline</i>
    <span>{props.msg}</span>
  </StyledErrorMessage>
);

ErrMsg.propTypes = {
  msg: PropTypes.string.isRequired
};

export default ErrMsg;
