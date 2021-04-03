import './App.css';
import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
// import Welcome from "./pages/welcome";
// import Introduction from "./pages/introduction";
import Cup from "./pages/cup";
import 'antd/dist/antd.css';

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/">
                {/*<Welcome/>*/}
                {/*<Introduction num="10" message={intro} />*/}
                <Cup/>
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
