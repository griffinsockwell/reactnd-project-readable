import React from 'react';
import styled from 'styled-components';

const StyledPost = styled.div``;

const Post = props => (
  <StyledPost>Viewing post: {props.match.params.id}</StyledPost>
);

export default Post;
