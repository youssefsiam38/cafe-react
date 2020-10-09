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
import MenuItem from './components/MenuItem/MenuItem.js'
import Edit from './components/Edit/Edit.js'
import Add from './components/Add/Add.js'
import './assets/main.css'


const client = new ApolloClient({
  uri: keys.GRAPHQL_URL
});

function App() {
  return (
      <ApolloProvider client={client}>
        <div className="bg-gray-300">
          <Router>
          <Header/>
            <Switch>
              <Route exact path="/add" component={Add}/>
              <Route exact path="/" component={Home}/>

              <Route exact path="/:id" component={MenuItem}></Route>
              <Route exact path="/edit/:id" component={() => <Edit />}></Route>

              {/*<Route exact path="/spell" component={Spell}></Route>

              <Route path="/" component={Spells}></Route> */}
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
  );
}

export default App;
