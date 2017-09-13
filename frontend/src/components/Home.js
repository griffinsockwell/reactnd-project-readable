// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// api
import { fetchPosts, resetPosts } from '../actions';
// components
import PostList from './PostList';

const StyledHome = styled.div`
  h2 {
    margin-top: 10px;
    color: #d8d8d8;
  }
`;

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillUnmount() {
    this.props.resetPosts();
  }

  render() {
    const { loading, error, posts } = this.props;

    return (
      <StyledHome>
        <h2>ALL POSTS</h2>
        <PostList loading={loading} error={error} posts={posts} />
      </StyledHome>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error, posts } = state.posts;
  return { loading, error, posts };
};

export default connect(mapStateToProps, {
  fetchPosts,
  resetPosts
})(Home);
