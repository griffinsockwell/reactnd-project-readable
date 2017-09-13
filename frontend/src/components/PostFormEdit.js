import React from 'react';
import styled from 'styled-components';

const StyledPostForm = styled.form``;

const PostFormEdit = props => (
  <StyledPostForm>Editing post: {props.match.params.id}</StyledPostForm>
);

export default PostFormEdit;
