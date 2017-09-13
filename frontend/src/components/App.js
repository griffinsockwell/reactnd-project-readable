import React from 'react';
import { Switch, Route } from 'react-router';
import Category from './Category';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Post from './Post';
import PostFormEdit from './PostFormEdit';
import PostFormNew from './PostFormNew';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/category/:category" component={Category} />
      <Route path="/new-post" component={PostFormNew} />
      <Route path="/post/:id" exact component={Post} />
      <Route path="/post/:id/edit" component={PostFormEdit} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
