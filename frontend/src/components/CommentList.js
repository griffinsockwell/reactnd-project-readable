// node_modules
import React from 'react';
import styled from 'styled-components';
// components
import CommentListItem from './CommentListItem';

const StyledList = styled.ul`list-style-type: none;`;
const StyledCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
const StyledNoComments = styled.div`
  font-weight: 700;
  color: #9b9b9b;
`;

const CommentList = props => {
  let component;
  if (props.comments.length) {
    component = (
      <StyledList>
        {props.comments.map(comment => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </StyledList>
    );
  } else {
    component = (
      <StyledCentered>
        <StyledNoComments>NO COMMENTS FOR THIS POST</StyledNoComments>
      </StyledCentered>
    );
  }

  return component;
};

export default CommentList;
