// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// api
import { fetchPostsForCategory, resetPosts } from '../actions';
// components
import PostList from './PostList';

const StyledCategory = styled.div`
  h2 {
    margin-top: 10px;
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
    const { loading, error, posts } = this.props;

    return (
      <StyledCategory>
        <h2>{this.props.match.params.category.toUpperCase()} POSTS</h2>
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
