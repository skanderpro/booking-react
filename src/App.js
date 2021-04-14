import logo from './logo.svg';
import './App.css';
import React from "react";
import {Switch,Route} from 'react-router-dom';
import Home from "./containers/Home";
import ClassDetail from "./containers/ClassDetail";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/class-detail'} component={ClassDetail}/>
        </Switch>
    </div>
  );
}

export default App;
