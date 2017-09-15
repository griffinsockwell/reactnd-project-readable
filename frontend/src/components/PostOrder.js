// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import { setPostsOrder } from '../actions';

const StyledPostOrder = styled.div`font-size: 14px;`;
const StyledOrderButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 700;
  margin: 4px;
  color: ${props => (props.selected ? '#ff7a37' : '#4a4a4a')};
  transition: all 0.2s;
  :hover {
    color: #9b9b9b;
  }
`;

class PostOrder extends React.Component {
  static propTypes = {
    order: PropTypes.string.isRequired,
    setPostsOrder: PropTypes.func.isRequired
  };

  orderByDate = () => {
    this.props.setPostsOrder('timestamp');
  };

  orderByScore = () => {
    this.props.setPostsOrder('voteScore');
  };

  render() {
    const { order } = this.props;

    return (
      <StyledPostOrder>
        <span>Order by:</span>
        <StyledOrderButton
          onClick={this.orderByDate}
          selected={order === 'timestamp'}
        >
          DATE
        </StyledOrderButton>
        <span>/</span>
        <StyledOrderButton
          onClick={this.orderByScore}
          selected={order === 'voteScore'}
        >
          SCORE
        </StyledOrderButton>
      </StyledPostOrder>
    );
  }
}

const mapStateToProps = state => ({ order: state.posts.order });

export default connect(mapStateToProps, { setPostsOrder })(PostOrder);
