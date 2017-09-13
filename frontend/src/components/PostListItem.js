// node_modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import format from 'date-fns/format';
// utils
import getColor from '../utils/getColor';

const StyledListItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
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
const StyledVoteCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  span {
    color: #4a4a4a;
    font-size: 20px;
    font-weight: 700;
  }
  button {
    color: #9b9b9b;
    border: none;
    background: none;
    transition: all 0.2s;
  }
  button:hover {
    color: #ff7a37;
  }
`;
const StyledPostInfo = styled.div`
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

const PostListItem = props => {
  const { post } = props;
  return (
    <StyledListItem>
      <StyledVoteCount>
        <button title="vote up">
          <i className="material-icons">keyboard_arrow_up</i>
        </button>
        <span>{post.voteScore}</span>
        <button title="vote down">
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
      </StyledVoteCount>

      <StyledPostInfo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledPostLink to={`/post/${post.id}`}>{post.title}</StyledPostLink>
          <StyledEdit to={`/post/${post.id}/edit`}>
            <i className="material-icons">edit</i>
          </StyledEdit>
        </div>
        <div>
          <span>post by {post.author}</span>{' '}
          <StyledCategoryLink
            to={`/category/${post.category}`}
            name={post.category}
          >
            {post.category.toUpperCase()}
          </StyledCategoryLink>
        </div>
      </StyledPostInfo>

      <StyledDate>
        <span>{format(new Date(post.timestamp), 'ddd')}</span>
        <div>{format(new Date(post.timestamp), 'MMM D')}</div>
        <span>{format(new Date(post.timestamp), 'YYYY')}</span>
      </StyledDate>

      <StyledDelete title="delete post">
        <i className="material-icons">delete</i>
      </StyledDelete>
    </StyledListItem>
  );
};

export default PostListItem;
