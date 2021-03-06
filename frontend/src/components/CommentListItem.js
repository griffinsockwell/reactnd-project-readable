// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import format from 'date-fns/format';
// actions
import { setCommentToEdit, removeComment } from '../actions';
// components
import CommentFormEdit from './CommentFormEdit';
import VoteCounter from './VoteCounter';

const StyledListItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  :nth-child(even) {
    background-color: #fafafa;
  }
`;
const StyledCommentBody = styled.div`
  text-decoration: none;
  color: #212121;
`;
const StyledCommentInfo = styled.div`
  flex: 1;
  span {
    color: #9b9b9b;
    font-size: 16px;
  }
`;
const StyledDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  text-transform: uppercase;
  span {
    color: #9b9b9b;
    font-size: 15px;
  }
  div {
    color: #4a4a4a;
    font-size: 18px;
  }
`;
const StyledEdit = styled.button`
  margin-left: 10px;
  color: #9b9b9b;
  border: none;
  background: none;
  transition: all 0.2s;
  :hover {
    color: #4990e2;
  }
`;
const StyledDelete = styled.button`
  border: none;
  background: none;
  margin-left: 10px;
  color: #e0e0e0;
  transition: all 0.2s;
  :hover {
    color: #fe5e78;
  }
`;

class CommentListItem extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    editingCommentId: PropTypes.string.isRequired,
    removeComment: PropTypes.func.isRequired,
    setCommentToEdit: PropTypes.func.isRequired
  };

  handleRemove = () => {
    const { comment, removeComment } = this.props;
    removeComment(comment);
  };

  startEditing = () => {
    const { comment, setCommentToEdit } = this.props;
    setCommentToEdit(comment.id);
  };

  render() {
    const { comment } = this.props;

    let component;
    if (this.props.editingCommentId === comment.id) {
      component = <CommentFormEdit comment={comment} />;
    } else {
      component = (
        <StyledListItem>
          <VoteCounter item={comment} />

          <StyledCommentInfo>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledCommentBody>{comment.body}</StyledCommentBody>
              <StyledEdit onClick={this.startEditing}>
                <i className="material-icons">edit</i>
              </StyledEdit>
            </div>
            <div>
              <span>comment by {comment.author}</span>
            </div>
          </StyledCommentInfo>

          <StyledDate>
            <span>{format(new Date(comment.timestamp), 'ddd')}</span>
            <div>{format(new Date(comment.timestamp), 'MMM D')}</div>
            <span>{format(new Date(comment.timestamp), 'YYYY')}</span>
          </StyledDate>

          <StyledDelete title="delete post" onClick={this.handleRemove}>
            <i className="material-icons">delete</i>
          </StyledDelete>
        </StyledListItem>
      );
    }
    return component;
  }
}

const mapStateToProps = state => ({
  editingCommentId: state.commentEdit.editingCommentId
});

export default connect(mapStateToProps, { setCommentToEdit, removeComment })(
  CommentListItem
);
