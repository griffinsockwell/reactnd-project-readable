// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// actions
import {
  setTextForPostCreate,
  setCategoryForPostCreate,
  resetPostCreate,
  postCreate
} from '../actions';
// common
import ErrMsg from '../common/ErrMsg';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormSubmit from '../common/FormSubmit';
import FormTextarea from '../common/FormTextarea';

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
  margin-bottom: 10px;
`;

class PostFormNew extends React.Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    postCreate: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    resetPostCreate: PropTypes.func.isRequired,
    setCategoryForPostCreate: PropTypes.func.isRequired,
    setTextForPostCreate: PropTypes.func.isRequired,
    staticContext: PropTypes.any,
    submitting: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  };

  componentWillUnmount() {
    this.props.resetPostCreate();
  }

  handleSubmit = event => {
    event.preventDefault();
    const author = this.props.author.trim();
    const title = this.props.title.trim();
    const body = this.props.body.trim();
    const { category } = this.props;
    const values = { author, title, body, category };
    this.props.postCreate(values);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.props.setTextForPostCreate(name, value);
  };

  handleSelect = event => {
    this.props.setCategoryForPostCreate(event.target.value);
  };

  render() {
    const {
      submitting,
      error,
      author,
      title,
      category,
      body,
      postId
    } = this.props;
    const disabled =
      !author.trim() || !title.trim() || !body.trim() || category === 'none';

    let component;
    if (postId) {
      component = <Redirect to={`/post/${postId}`} />;
    } else {
      component = (
        <StyledNew>
          <h2>NEW POST</h2>

          <StyledPostForm onSubmit={this.handleSubmit}>
            <FormInput
              label="Author"
              htmlFor="createAuthor"
              name="author"
              value={author}
              onChange={this.handleChange}
            />

            <FormSelect
              htmlFor="createCategory"
              value={category}
              onChange={this.handleSelect}
              categories={this.props.categories}
            />

            <FormInput
              label="Title"
              htmlFor="createTitle"
              name="title"
              value={title}
              onChange={this.handleChange}
            />

            <FormTextarea
              label="Body"
              htmlFor="createBody"
              name="body"
              value={body}
              onChange={this.handleChange}
              large
            />

            {error && (
              <StyledCentered>
                <ErrMsg msg={error} />
              </StyledCentered>
            )}

            <FormSubmit
              text="Add post"
              submitting={submitting}
              disabled={disabled}
            />
          </StyledPostForm>
        </StyledNew>
      );
    }

    return component;
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  submitting: state.postCreate.submitting,
  error: state.postCreate.error,
  author: state.postCreate.author,
  title: state.postCreate.title,
  body: state.postCreate.body,
  category: state.postCreate.category,
  postId: state.postCreate.postId
});

export default connect(mapStateToProps, {
  setTextForPostCreate,
  setCategoryForPostCreate,
  resetPostCreate,
  postCreate
})(PostFormNew);
