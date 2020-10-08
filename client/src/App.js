import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import keys from './keys.js'
import Home from './components/Home/Home.js'
import Header from './components/Header/Header.js'
import './assets/main.css'

const client = new ApolloClient({
  uri: keys.GRAPHQL_URL
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Header/>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>

            {/* <Route exact path="/signin" component={SignIn}></Route>

            <Route exact path="/spell" component={Spell}></Route>

            <Route path="/" component={Spells}></Route> */}
          </Switch>
        </Router>
      </ApolloProvider>
  );
}

export default App;
