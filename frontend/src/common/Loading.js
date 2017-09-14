import React from 'react';
import ReactLoading from 'react-loading';

const Loading = props => (
  <ReactLoading
    type={props.type || 'spin'}
    color={props.color || '#ff7a37'}
    delay={props.delay || 300}
    height={props.height || 22}
    width={props.width || 22}
  />
);

export default Loading;
