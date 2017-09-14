// node_modules
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import {
  resetCommentToEdit,
  setTextForCommentEdit,
  commentEdit
} from '../actions';
// common
import ErrMsg from '../common/ErrMsg';
import Loading from '../common/Loading';

const StyledNew = styled.div`margin: 10px;`;
const StyledCommentForm = styled.form`
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 8px;
`;
const StyledFormGroup = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #4a4a4a;
  }
  input {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 44px;
    padding-left: 10px;
    font-size: 16px;
  }
  textarea {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 88px;
    padding: 10px;
    font-size: 16px;
    resize: vertical;
  }
`;
const StyledSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 44px;
  background-color: #ff7a37;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  transition: all 0.2s;
  span {
    margin: 0 10px;
  }
  :hover {
    background-color: #e66e32;
  }
  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;
const StyledCancel = styled.button`
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 3px 6px;
  background-color: #9b9b9b;
  :hover {
    background-color: #4a4a4a;
  }
`;
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

class CommentFormEdit extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const { comment } = this.props;
    const body = this.props.body.trim() || comment.body;
    const values = { body };
    this.props.commentEdit(values, comment.id);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.props.setTextForCommentEdit(name, value);
  };

  cancelEditing = () => {
    this.props.resetCommentToEdit();
  };

  render() {
    const { comment, submitting, error, body } = this.props;

    return (
      <StyledNew>
        <StyledCancel onClick={this.cancelEditing}>Cancel edit</StyledCancel>

        <StyledCommentForm onSubmit={this.handleSubmit}>
          <StyledFormGroup>
            <label htmlFor="editCommentAuthor">Author</label>
            <input
              type="text"
              id="editCommentAuthor"
              name="author"
              value={comment.author}
              disabled
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <label htmlFor="editCommentBody">Body</label>
            <textarea
              id="editCommentBody"
              name="body"
              defaultValue={comment.body || body}
              onChange={this.handleChange}
            />
          </StyledFormGroup>

          {error && (
            <StyledCentered>
              <ErrMsg msg={error} />
            </StyledCentered>
          )}

          <StyledSubmit type="submit">
            <span>Edit comment</span>
            {submitting && <Loading color="#fff" />}
          </StyledSubmit>
        </StyledCommentForm>
      </StyledNew>
    );
  }
}

const mapStateToProps = state => ({
  editingCommentId: state.commentEdit.editingCommentId,
  submitting: state.commentEdit.submitting,
  error: state.commentEdit.error,
  body: state.commentEdit.body
});

export default connect(mapStateToProps, {
  resetCommentToEdit,
  setTextForCommentEdit,
  commentEdit
})(CommentFormEdit);
