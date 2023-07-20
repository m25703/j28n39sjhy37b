import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateCard from "./pages/CreateCard";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AutoCreate from "./pages/AutoCreate";
import Tp from "./pages/topic";

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page &nbsp;&nbsp;&nbsp; </Link>
                  <Link to="/CreateCard"> Create A Post &nbsp;&nbsp;&nbsp; </Link>
                  <Link to="/topic"> Sort by Topic </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout} style={{
              appearance: 'none',
              backgroundColor: "whitesmoke",
              borderRadius: '2vw',
              borderStyle: 'none',
              color: '#515151',
              cursor: 'pointer',
              fontFamily:
                'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
              fontSize: '1vw',
              lineHeight: 'normal',
              minWidth: '0',
              outline: 'none',
              textAlign: 'center',
              verticalAlign: 'center',
              textDecoration: 'none',
              transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
              userSelect: 'none',
              touchAction: 'manipulation',
              width: '6vw',
              willChange: 'transform'
            }} >Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/CreateCard" exact component={CreateCard} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="/autocreate" exact component={AutoCreate} />
            <Route path="/topic" exact component={Tp} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
