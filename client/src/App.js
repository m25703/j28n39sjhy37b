import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Createpost from "./pages/Createpost";

function App() {
  return (
    <div className="App" style={{align: 'center',
    justifyContent: 'center',
    alignItems: 'center'}}>
      <Router>
        <Link to="/createpost"> Create Card</Link>
        <Link to="/"> Home Page</Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" exact component={Createpost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
