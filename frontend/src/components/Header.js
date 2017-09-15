// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
// api
import { fetchCategories } from '../actions';
// common
import ErrMsg from '../common/ErrMsg';
import Loading from '../common/Loading';
// utils
import getColor from '../utils/getColor';

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
const StyledCategories = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledCategoryLink = styled(NavLink)`
  border: 2px solid ${props => getColor(props.name)};
  border-radius: 2px;
  margin: 4px;
  padding: 4px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  color: #4a4a4a;
  transition: all 0.2s;
  :hover {
    color: ${props => getColor(props.name)};
  }
`;

class Header extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { loading, error, categories } = this.props;

    let displayCategories;
    if (loading) {
      displayCategories = <Loading />;
    } else if (error) {
      displayCategories = <ErrMsg msg={error} />;
    } else {
      displayCategories = categories.map(category => (
        <StyledCategoryLink
          to={`/category/${category.name}`}
          key={category.name}
          name={category.name}
        >
          {category.name.toUpperCase()}
        </StyledCategoryLink>
      ));
    }

    return (
      <StyledHeader>
        <StyledHomeLink to="/">
          <i className="material-icons">tag_faces</i>
          <span>Readable</span>
        </StyledHomeLink>

        <StyledCategories>{displayCategories}</StyledCategories>

        <StyledNewPostLink to="/new-post">
          <i className="material-icons">add</i>
          <span>New Post</span>
        </StyledNewPostLink>
      </StyledHeader>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error, categories } = state.categories;
  return { loading, error, categories };
};

export default connect(mapStateToProps, { fetchCategories })(Header);
