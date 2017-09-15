// node_modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import { voteForPost, voteForComment } from '../actions';

const StyledVoteCounter = styled.div`
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

class VoteCounter extends React.Component {
  static propTypes = {
    isPost: PropTypes.bool,
    item: PropTypes.object.isRequired,
    voteForComment: PropTypes.func.isRequired,
    voteForPost: PropTypes.func.isRequired
  };

  handleIncrease = () => {
    const option = 'upVote';
    const { item, isPost } = this.props;
    if (isPost) {
      this.props.voteForPost(item, option);
    } else {
      this.props.voteForComment(item, option);
    }
  };

  handleDecrease = () => {
    const option = 'downVote';
    const { item, isPost } = this.props;
    if (isPost) {
      this.props.voteForPost(item, option);
    } else {
      this.props.voteForComment(item, option);
    }
  };

  render() {
    const { item } = this.props;
    return (
      <StyledVoteCounter>
        <button title="vote up" onClick={this.handleIncrease}>
          <i className="material-icons">keyboard_arrow_up</i>
        </button>
        <span>{item.voteScore}</span>
        <button title="vote down" onClick={this.handleDecrease}>
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
      </StyledVoteCounter>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  voteForPost,
  voteForComment
})(VoteCounter);
