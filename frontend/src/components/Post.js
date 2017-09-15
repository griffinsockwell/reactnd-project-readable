// node_modules
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// actions
import { fetchPost, resetPost } from '../actions';
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
  }

  componentWillUnmount() {
    this.props.resetPost();
  }

  render() {
    const { loading, error, post } = this.props;

    let component;
    if (loading) {
      component = (
        <StyledCentered>
          <Loading />
        </StyledCentered>
      );
    } else if (error) {
      component = (
        <StyledCentered>
          <ErrMsg msg={error} />
        </StyledCentered>
      );
    } else if (post.deleted || !post.id) {
      component = <Redirect to="/" />;
    } else {
      component = (
        <StyledPost>
          <div>
            <h2>POST</h2>
            <div>
              <PostListItem post={this.props.post} />
              <StyledPostBody>{this.props.post.body}</StyledPostBody>
            </div>
          </div>

          <StyledComments>
            <h2>COMMENTS</h2>
            <CommentList parentId={this.props.post.id} />
            <CommentFormNew parentId={this.props.post.id} />
          </StyledComments>
        </StyledPost>
      );
    }

    return component;
  }
}

const mapStateToProps = state => ({
  loading: state.post.loading,
  error: state.post.error,
  post: state.post.post
});

export default connect(mapStateToProps, { fetchPost, resetPost })(Post);
