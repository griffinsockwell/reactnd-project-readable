import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div>
    <NavLink to="/">Readable</NavLink>
    <div />
    <NavLink to="/new-post">New Post</NavLink>
  </div>
);

export default Header;
