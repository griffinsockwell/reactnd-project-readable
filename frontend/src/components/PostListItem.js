// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import format from 'date-fns/format';
// actions
import { removePost, commentsForPost } from '../actions';
// components
import VoteCounter from './VoteCounter';
// utils
import getColor from '../utils/getColor';

const StyledListItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  :nth-child(even) {
    background-color: #fafafa;
  }
`;
const StyledPostLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 700;
  color: #212121;
  transition: all 0.2s;
  :hover {
    color: #ff7a37;
  }
`;
const StyledCategoryLink = styled(NavLink)`
  border: 2px solid ${props => getColor(props.name)};
  border-radius: 2px;
  margin: 3px;
  padding: 3px;
  text-decoration: none;
  font-size: 10px;
  font-weight: 700;
  color: #4a4a4a;
  transition: all 0.2s;
  :hover {
    color: ${props => getColor(props.name)};
  }
`;
const StyledPostInfo = styled.div`
  flex: 1;
  span {
    color: #9b9b9b;
    font-size: 16px;
  }
  strong {
    color: #7a7a7a;
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
    font-size: 16px;
  }
  div {
    color: #4a4a4a;
    font-size: 20px;
  }
`;
const StyledEdit = styled(NavLink)`
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

class PostListItem extends React.Component {
  static propTypes = {
    commentsForPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    removePost: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { post, commentsForPost } = this.props;
    commentsForPost(post);
  }

  handleRemove = () => {
    const { post, removePost } = this.props;
    removePost(post);
  };

  render() {
    const { post } = this.props;

    let component;
    if (post.deleted) {
      component = <div />;
    } else {
      const commentCount = post.comments ? post.comments.length : 0;
      component = (
        <StyledListItem>
          <VoteCounter item={post} isPost />

          <StyledPostInfo>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledPostLink to={`/${post.category}/${post.id}`}>
                {post.title}
              </StyledPostLink>
              <StyledEdit to={`/${post.category}/${post.id}/edit`}>
                <i className="material-icons">edit</i>
              </StyledEdit>
            </div>

            <div>
              <span>post by</span> <strong>{post.author}</strong>{' '}
              <span>has</span> <strong>{commentCount}</strong>{' '}
              <span>comment{commentCount !== 1 && 's'}</span>{' '}
              <StyledCategoryLink to={`/${post.category}`} name={post.category}>
                {post.category.toUpperCase()}
              </StyledCategoryLink>
            </div>
          </StyledPostInfo>

          <StyledDate>
            <span>{format(new Date(post.timestamp), 'ddd')}</span>
            <div>{format(new Date(post.timestamp), 'MMM D')}</div>
            <span>{format(new Date(post.timestamp), 'YYYY')}</span>
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { removePost, commentsForPost })(
  PostListItem
);
