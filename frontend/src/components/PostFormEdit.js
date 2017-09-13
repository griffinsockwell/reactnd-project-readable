import React from 'react';

const PostFormEdit = props => (
  <form>Editing post: {props.match.params.id}</form>
);

export default PostFormEdit;
