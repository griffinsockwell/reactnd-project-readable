// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import { resetCommentToEdit } from '../actions';
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
  componentWillUnmount() {
    this.props.resetCommentToEdit();
  }

  render() {
    let component;
    if (this.props.comments.length) {
      component = (
        <StyledList>
          {this.props.comments.map(comment => (
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { resetCommentToEdit })(CommentList);
