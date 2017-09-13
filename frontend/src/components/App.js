// node_modules
import React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
// components
import Category from './Category';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Post from './Post';
import PostFormEdit from './PostFormEdit';
import PostFormNew from './PostFormNew';

const StyledApp = styled.div``;
const StyledContainer = styled.div`
  height: calc(100vh - 60px);
  overflow: scroll;
`;
const StyledContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const App = () => (
  <StyledApp>
    <Header />
    <StyledContainer>
      <StyledContent>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/category/:category" component={Category} />
          <Route path="/new-post" component={PostFormNew} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/post/:id/edit" component={PostFormEdit} />
          <Route component={NotFound} />
        </Switch>
      </StyledContent>
    </StyledContainer>
  </StyledApp>
);

export default App;
