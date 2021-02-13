import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/protected-route';
import Navbar from './components/navbar/Navbar';
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

        <Navbar user={this.state.loggedInUser} getUser={this.getTheUser} />

        <Switch>

          <ProtectedRoute 
            exact
            user={this.state.loggedInUser} 
            path='/' 
            component={ProjectList} 
          />

          <ProtectedRoute 
            user={this.state.loggedInUser} 
            path="/projects/:id"
            component={ProjectDetails}
          />

          <Route exact path='/signup' render={(props) => <Signup {...props} getUser={this.getTheUser}/>}/>

          <Route exact path='/login' render={(props) => <Login {...props} getUser={this.getTheUser}/>}/>

        </Switch>
        
      </div>
    );
  }
}

export default App;
