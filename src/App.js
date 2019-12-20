import React from 'react';
import { NavBar } from './components';
import { 
  Splash, 
  About, 
  Bills, 
  Legislators, 
  InterestGroups, 
  LegislatorInstance,
  BillInstance,
  InterestGroupInstance,
  GlobalSearch,
  Visualization,
} from './pages/';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles/main.scss';

const App = () => {

  const getRoutes = () => {
    return(
      <Switch>
        <Route exact path="/" render={props => <Splash {... props }/>}/>
        <Route path="/about" render={props => <About {... props }/>}/>
        <Route path="/bills/:id" render={props => <BillInstance {... props }/>}/>
        <Route path="/bills" render={props => <Bills {... props }/>}/>
        <Route path="/legislators/:id" render={props => <LegislatorInstance {... props }/>}/>
        <Route path="/legislators" render={props => <Legislators {... props }/>}/>
        <Route path="/interest-groups/:id" render={props => <InterestGroupInstance {... props }/>}/>
        <Route path="/interest-groups" render={props => <InterestGroups {... props }/>}/>
        <Route path="/search/:id" render={props => <GlobalSearch {... props }/>}/>
        <Route path="/search" render={props => <GlobalSearch {... props }/>}/>
        <Route path="/visualizations" render={props => <Visualization {... props }/>}/>
      </Switch>
    );
  }

  return (
    <div id="app">
      <Router>
        <NavBar/>
        <div className="container">
          {getRoutes()}
        </div>
      </Router>
    </div>
  );
}

export default App;
