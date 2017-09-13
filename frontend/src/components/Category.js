import React from 'react';
import styled from 'styled-components';

const StyledCategory = styled.div``;

const Category = props => (
  <StyledCategory>Category: {props.match.params.category}</StyledCategory>
);

export default Category;
