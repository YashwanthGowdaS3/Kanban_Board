import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Board from './components/Board';
import Login from './components/Login';
import Register from './components/Register';
import "./app.css";

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const [token, setToken] = useState(() => getToken());

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/board">
          <Board />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          {!token ? <Login setToken={setToken}/> : <Redirect token={token} to="/board" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
