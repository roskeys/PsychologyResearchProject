import './App.css';
import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Welcome from "./pages/welcome";

// import React, {createContext, useContext} from "react";
// import {useHistory, Route, Switch, BrowserRouter,} from "react-router-dom";
// export const UserContext = createContext();

const Routing = () => {
    // const history = useHistory();
    // const {state, dispatch} = useContext(UserContext);
    return (
        <Switch>
            <Route exact path="/">
                <Welcome />
            </Route>
        </Switch>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    );
}

export default App;
