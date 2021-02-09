import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './components/auth/Signup';
import ProjectDetails from './components/projects/ProjectDetails';
import ProjectList from './components/projects/ProjectList';

class App extends React.Component {

  state = { loggedInUser: null }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    return (
      <div className="App">

        {
          this.state.loggedInUser ? 
            <h1>Username: {this.state.loggedInUser.username}</h1> :
            null
        }

        <Switch>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path="/projects" component={ProjectList} />
          <Route path="/projects/:id" component={ProjectDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
