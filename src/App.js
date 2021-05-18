import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ToDo from './components/ToDo';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ToDo></ToDo>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
