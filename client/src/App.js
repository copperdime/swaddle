import React from "react";
import Transactions from "./pages/transactions";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () =>
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/transactions" component={Transactions} />

            </Switch>
        </div>
    </Router>;

export default App;

