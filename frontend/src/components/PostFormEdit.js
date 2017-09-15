// node_modules
import React from 'react';
import PropTypes from 'prop-types';
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
import FormInput from '../common/FormInput';
import FormSubmit from '../common/FormSubmit';
import FormTextarea from '../common/FormTextarea';
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
  static propTypes = {
    body: PropTypes.string.isRequired,
    errorFetch: PropTypes.string.isRequired,
    errorSubmit: PropTypes.string.isRequired,
    fetchPostToEdit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    postEdit: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    resetPostToEdit: PropTypes.func.isRequired,
    setTextForPostEdit: PropTypes.func.isRequired,
    staticContext: PropTypes.any,
    submitting: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  };

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
            <FormInput
              label="Author"
              htmlFor="editPostAuthor"
              value={post.author}
              disabled
            />

            <FormInput
              label="Category"
              htmlFor="editPostCategory"
              value={post.category}
              disabled
            />

            <FormInput
              label="Title"
              htmlFor="editPostTitle"
              name="title"
              defaultValue={post.title || title}
              onChange={this.handleChange}
            />

            <FormTextarea
              label="Body"
              htmlFor="editPostBody"
              name="body"
              defaultValue={post.body || body}
              onChange={this.handleChange}
              large
            />

            {errorSubmit && (
              <StyledCenteredError>
                <ErrMsg msg={errorSubmit} />
              </StyledCenteredError>
            )}

            <FormSubmit text="Edit post" submitting={submitting} />
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
