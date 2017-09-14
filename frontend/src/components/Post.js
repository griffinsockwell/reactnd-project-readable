// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import { fetchPost, resetPost, fetchComments, resetComments } from '../actions';
// common
import ErrMsg from '../common/ErrMsg';
import Loading from '../common/Loading';
// components
import CommentFormNew from './CommentFormNew';
import CommentList from './CommentList';
import PostListItem from './PostListItem';

const StyledPost = styled.div`
  h2 {
    margin-top: 10px;
    color: #d8d8d8;
  }
`;
const StyledPostBody = styled.p`
  font-size: 20px;
  padding: 10px;
  margin: 0 10px;
  text-align: center;
  background-color: #f1f1f1;
  border-radius: 10px;
`;
const StyledComments = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

class Post extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    this.props.fetchComments(id);
  }

  componentWillUnmount() {
    this.props.resetPost();
    this.props.resetComments();
  }

  render() {
    let component;
    if (this.props.postLoading || this.props.commentsLoading) {
      component = (
        <StyledCentered>
          <Loading />
        </StyledCentered>
      );
    } else if (this.props.postError) {
      component = (
        <StyledCentered>
          <ErrMsg msg={this.props.postError} />
        </StyledCentered>
      );
    } else {
      component = (
        <StyledPost>
          <div>
            <h2>POST</h2>
            {!this.props.postLoading && (
              <div>
                <PostListItem post={this.props.post} />
                <StyledPostBody>{this.props.post.body}</StyledPostBody>
              </div>
            )}
          </div>

          <StyledComments>
            <h2>COMMENTS</h2>

            {!this.props.commentsLoading && (
              <CommentList comments={this.props.comments} />
            )}

            <CommentFormNew parentId={this.props.post.id} />
          </StyledComments>
        </StyledPost>
      );
    }

    return component;
  }
}

const mapStateToProps = state => {
  return {
    postLoading: state.post.loading,
    postError: state.post.error,
    post: state.post.post,
    commentsLoading: state.comments.loading,
    commentsError: state.comments.error,
    comments: state.comments.comments
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  resetPost,
  fetchComments,
  resetComments
})(Post);
