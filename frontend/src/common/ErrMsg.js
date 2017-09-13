import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: #fe5e78;
  span {
    margin-left: 4px;
  }
`;

const ErrMsg = msg => (
  <StyledErrorMessage>
    <i className="material-icons">error_outline</i>
    <span>{msg}</span>
  </StyledErrorMessage>
);

export default ErrMsg;
