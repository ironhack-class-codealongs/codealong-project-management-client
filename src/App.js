import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProjectDetails from './components/projects/ProjectDetails';
import ProjectList from './components/projects/ProjectList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/projects" component={ProjectList} />
        <Route path="/projects/:id" component={ProjectDetails} />
      </Switch>
    </div>
  );
}

export default App;
