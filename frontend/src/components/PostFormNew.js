// node_modules
import React from 'react';
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
  margin-bottom: 10px;
`;

class PostFormNew extends React.Component {
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
            <StyledFormGroup>
              <label htmlFor="createAuthor">Author</label>
              <input
                type="text"
                id="createAuthor"
                name="author"
                value={author}
                onChange={this.handleChange}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <label htmlFor="createTitle">Title</label>
              <input
                type="text"
                id="createTitle"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <label htmlFor="createCategory">Category</label>
              <select
                id="createCategory"
                value={category}
                onChange={this.handleSelect}
              >
                <option value="none" disabled>
                  Select...
                </option>
                {this.props.categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </StyledFormGroup>

            <StyledFormGroup>
              <label htmlFor="createBody">Body</label>
              <textarea
                id="createBody"
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
              <span>Add post</span>
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
