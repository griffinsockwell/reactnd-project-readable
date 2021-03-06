// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';
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
  let posts = [];
  if (props.loading === false && props.posts.length) {
    const filteredPosts = props.posts.filter(post => post.deleted === false);
    posts = orderBy(filteredPosts, [props.order], ['desc']);
  }

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
  } else if (posts.length) {
    component = (
      <StyledList>
        {posts.map(post => <PostListItem key={post.id} post={post} />)}
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

PostList.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  order: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({ order: state.posts.order });

export default connect(mapStateToProps, {})(PostList);
