// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import {
  setTextForCommentCreate,
  resetCommentCreate,
  commentCreate
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
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

class CommentFormNew extends React.Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    commentCreate: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    resetCommentCreate: PropTypes.func.isRequired,
    setTextForCommentCreate: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  componentWillUnmount() {
    this.props.resetCommentCreate();
  }

  handleSubmit = event => {
    event.preventDefault();
    const author = this.props.author.trim();
    const body = this.props.body.trim();
    const values = { author, body, parentId: this.props.parentId };
    this.props.commentCreate(values);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.props.setTextForCommentCreate(name, value);
  };

  render() {
    const { submitting, error, author, body } = this.props;
    const disabled = !author.trim() || !body.trim();

    return (
      <StyledNew>
        <StyledCommentForm onSubmit={this.handleSubmit}>
          <FormInput
            label="Author"
            htmlFor="createCommentAuthor"
            name="author"
            value={author}
            onChange={this.handleChange}
          />

          <FormTextarea
            label="Body"
            htmlFor="createCommentBody"
            name="body"
            value={body}
            onChange={this.handleChange}
          />

          {error && (
            <StyledCentered>
              <ErrMsg msg={error} />
            </StyledCentered>
          )}

          <FormSubmit
            text="Add comment"
            submitting={submitting}
            disabled={disabled}
          />
        </StyledCommentForm>
      </StyledNew>
    );
  }
}

const mapStateToProps = state => {
  const { submitting, error, author, body } = state.commentCreate;
  return { submitting, error, author, body };
};

export default connect(mapStateToProps, {
  setTextForCommentCreate,
  resetCommentCreate,
  commentCreate
})(CommentFormNew);
