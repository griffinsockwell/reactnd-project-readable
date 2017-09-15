import React from 'react';
import styled from 'styled-components';

const StyledNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-weight: 700;
  color: #9b9b9b;
`;

const NotFound = () => <StyledNotFound>Route not found</StyledNotFound>;

export default NotFound;
