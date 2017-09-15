// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// api
import { fetchPosts, resetPosts } from '../actions';
// components
import PostList from './PostList';
import PostOrder from './PostOrder';

const StyledHome = styled.div`
  header {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  h2 {
    flex: 1;
    color: #d8d8d8;
  }
`;

class Home extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    resetPosts: PropTypes.func.isRequired,
    staticContext: PropTypes.any
  };

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
        <header>
          <h2>ALL POSTS</h2>
          <PostOrder />
        </header>
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
