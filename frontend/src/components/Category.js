// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// api
import { fetchPostsForCategory, resetPosts } from '../actions';
// components
import PostList from './PostList';
import PostOrder from './PostOrder';

const StyledCategory = styled.div`
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

class Category extends React.Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchPostsForCategory(category);
  }

  componentWillUpdate(nextProps, nextState) {
    const currentCategory = this.props.match.params.category;
    const nextCategory = nextProps.match.params.category;
    if (currentCategory !== nextCategory) {
      this.props.resetPosts();
      this.props.fetchPostsForCategory(nextCategory);
    }
  }

  componentWillUnmount() {
    this.props.resetPosts();
  }

  render() {
    const { match, loading, error, posts } = this.props;

    return (
      <StyledCategory>
        <header>
          <h2>{match.params.category.toUpperCase()} POSTS</h2>
          <PostOrder />
        </header>

        <PostList loading={loading} error={error} posts={posts} />
      </StyledCategory>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error, posts } = state.posts;
  return { loading, error, posts };
};

export default connect(mapStateToProps, {
  fetchPostsForCategory,
  resetPosts
})(Category);
