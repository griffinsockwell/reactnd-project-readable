// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import { resetCommentToEdit, fetchComments, resetComments } from '../actions';
// common
import ErrMsg from '../common/ErrMsg';
import Loading from '../common/Loading';
// components
import CommentListItem from './CommentListItem';

const StyledList = styled.ul`list-style-type: none;`;
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
const StyledNoComments = styled.div`
  font-weight: 700;
  color: #9b9b9b;
`;

class CommentList extends React.Component {
  componentDidMount() {
    const { parentId, fetchComments } = this.props;
    fetchComments(parentId);
  }

  componentWillUnmount() {
    this.props.resetComments();
    this.props.resetCommentToEdit();
  }

  render() {
    const { loading, error, comments } = this.props;

    let allComments = [];
    if (loading === false && comments.length) {
      allComments = comments.filter(comment => comment.deleted === false);
    }

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
    } else if (allComments.length) {
      component = (
        <StyledList>
          {allComments.map(comment => (
            <CommentListItem key={comment.id} comment={comment} />
          ))}
        </StyledList>
      );
    } else {
      component = (
        <StyledCentered>
          <StyledNoComments>NO COMMENTS FOR THIS POST</StyledNoComments>
        </StyledCentered>
      );
    }

    return component;
  }
}

const mapStateToProps = state => ({
  loading: state.comments.loading,
  error: state.comments.error,
  comments: state.comments.comments
});

export default connect(mapStateToProps, {
  resetCommentToEdit,
  fetchComments,
  resetComments
})(CommentList);
