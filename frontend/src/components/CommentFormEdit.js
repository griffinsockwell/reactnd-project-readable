// node_modules
import React from 'react';
import PropTypes from 'prop-types';
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
import FormInput from '../common/FormInput';
import FormSubmit from '../common/FormSubmit';
import FormTextarea from '../common/FormTextarea';

const StyledNew = styled.div`margin: 10px;`;
const StyledCommentForm = styled.form`
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 8px;
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
  static propTypes = {
    body: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    commentEdit: PropTypes.func.isRequired,
    editingCommentId: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    resetCommentToEdit: PropTypes.func.isRequired,
    setTextForCommentEdit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

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
          <FormInput
            label="Author"
            htmlFor="editCommentAuthor"
            name="author"
            value={comment.author}
            disabled
          />

          <FormTextarea
            label="Body"
            htmlFor="editCommentBody"
            name="body"
            defaultValue={comment.body || body}
            onChange={this.handleChange}
          />

          {error && (
            <StyledCentered>
              <ErrMsg msg={error} />
            </StyledCentered>
          )}

          <FormSubmit text="Edit comment" submitting={submitting} />
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
