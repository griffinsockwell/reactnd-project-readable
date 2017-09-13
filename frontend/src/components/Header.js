import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(155, 155, 155, 0.5);
`;
const StyledHomeLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
  i {
    color: #ff7a37;
  }
  span {
    color: #4a4a4a;
    margin-left: 4px;
    transition: all 0.2s;
  }
  span:hover {
    color: #ff7a37;
  }
`;
const StyledNewPostLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  background-color: #ff7a37;
  color: #fff;
  height: 60px;
  padding: 10px;
  transition: all 0.2s;
  :hover {
    background-color: #e66e32;
  }
  span {
    margin-left: 4px;
  }
`;

const Header = () => (
  <StyledHeader>
    <StyledHomeLink to="/">
      <i className="material-icons">tag_faces</i>
      <span>Readable</span>
    </StyledHomeLink>
    <div style={{ flex: 1 }} />
    <StyledNewPostLink to="/new-post">
      <i className="material-icons">add</i>
      <span>New Post</span>
    </StyledNewPostLink>
  </StyledHeader>
);

export default Header;
