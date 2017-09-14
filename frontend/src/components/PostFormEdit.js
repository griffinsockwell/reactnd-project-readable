// node_modules
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// actions
import {
  fetchPostToEdit,
  resetPostToEdit,
  setTextForPostEdit,
  postEdit
} from '../actions';
// common
import ErrMsg from '../common/ErrMsg';
import Loading from '../common/Loading';

const StyledNew = styled.div`
  h2 {
    margin-top: 10px;
    color: #d8d8d8;
  }
`;
const StyledPostForm = styled.form`
  padding: 10px;
  margin: 0 10px;
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
  select {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 44px;
    font-size: 16px;
    background-color: #fff;
  }
  option:disabled {
    color: #9b9b9b;
  }
  textarea {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 132px;
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
  padding: 40px;
`;
const StyledCenteredError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

class PostFormEdit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPostToEdit(id);
  }

  componentWillUnmount() {
    this.props.resetPostToEdit();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { post } = this.props;
    const title = this.props.title.trim() || post.title;
    const body = this.props.body.trim() || post.body;
    const values = { title, body };
    this.props.postEdit(values, post.id);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.props.setTextForPostEdit(name, value);
  };

  render() {
    const {
      loading,
      errorFetch,
      post,
      submitting,
      errorSubmit,
      title,
      body,
      postId
    } = this.props;

    let component;
    if (postId) {
      component = <Redirect to={`/post/${postId}`} />;
    } else if (loading) {
      component = (
        <StyledCentered>
          <Loading />
        </StyledCentered>
      );
    } else if (errorFetch) {
      component = (
        <StyledCentered>
          <ErrMsg msg={this.props.errorFetch} />
        </StyledCentered>
      );
    } else {
      component = (
        <StyledNew>
          <h2>EDIT POST</h2>

          <StyledPostForm onSubmit={this.handleSubmit}>
            <StyledFormGroup>
              <label htmlFor="editPostAuthor">Author</label>
              <input
                type="text"
                id="editPostAuthor"
                value={post.author}
                disabled
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <label htmlFor="editPostTitle">Title</label>
              <input
                type="text"
                id="editPostTitle"
                name="title"
                defaultValue={post.title || title}
                onChange={this.handleChange}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <label htmlFor="editPostCategory">Category</label>
              <input
                type="text"
                id="editPostCategory"
                value={post.category}
                disabled
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <label htmlFor="editPostBody">Body</label>
              <textarea
                id="editPostBody"
                name="body"
                defaultValue={post.body || body}
                onChange={this.handleChange}
              />
            </StyledFormGroup>

            {errorSubmit && (
              <StyledCenteredError>
                <ErrMsg msg={errorSubmit} />
              </StyledCenteredError>
            )}

            <StyledSubmit type="submit">
              <span>Edit post</span>
              {submitting && <Loading color="#fff" />}
            </StyledSubmit>
          </StyledPostForm>
        </StyledNew>
      );
    }

    return component;
  }
}

const mapStateToProps = state => ({
  loading: state.postEdit.loading,
  errorFetch: state.postEdit.errorFetch,
  post: state.postEdit.post,
  submitting: state.postEdit.submitting,
  errorSubmit: state.postEdit.errorSubmit,
  title: state.postEdit.title,
  body: state.postEdit.body,
  postId: state.postEdit.postId
});

export default connect(mapStateToProps, {
  fetchPostToEdit,
  resetPostToEdit,
  setTextForPostEdit,
  postEdit
})(PostFormEdit);
