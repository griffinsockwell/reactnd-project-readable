// node_modules
import React from 'react';
import styled from 'styled-components';
// common
import ErrMsg from '../common/ErrMsg';
import Loading from '../common/Loading';
// components
import PostListItem from './PostListItem';

const StyledList = styled.ul`list-style-type: none;`;
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
const StyledNoPosts = styled.div`
  font-weight: 700;
  color: #9b9b9b;
`;

const PostList = props => {
  let component;
  if (props.loading) {
    component = (
      <StyledCentered>
        <Loading />
      </StyledCentered>
    );
  } else if (props.error) {
    component = (
      <StyledCentered>
        <ErrMsg msg={props.error} />
      </StyledCentered>
    );
  } else if (props.posts.length) {
    const filteredPosts = props.posts.filter(post => post.deleted === false);
    component = (
      <StyledList>
        {filteredPosts.map(post => <PostListItem key={post.id} post={post} />)}
      </StyledList>
    );
  } else {
    component = (
      <StyledCentered>
        <StyledNoPosts>NO POSTS FOR THIS CATEGORY</StyledNoPosts>
      </StyledCentered>
    );
  }

  return component;
};

export default PostList;
