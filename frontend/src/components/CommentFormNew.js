// node_modules
import React from 'react';
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
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

class CommentFormNew extends React.Component {
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
          <StyledFormGroup>
            <label htmlFor="createCommentAuthor">Author</label>
            <input
              type="text"
              id="createCommentAuthor"
              name="author"
              value={author}
              onChange={this.handleChange}
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <label htmlFor="createCommentBody">Body</label>
            <textarea
              id="createCommentBody"
              name="body"
              value={body}
              onChange={this.handleChange}
            />
          </StyledFormGroup>

          {error && (
            <StyledCentered>
              <ErrMsg msg={error} />
            </StyledCentered>
          )}

          <StyledSubmit type="submit" disabled={disabled}>
            <span>Add comment</span>
            {submitting && <Loading color="#fff" />}
          </StyledSubmit>
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
