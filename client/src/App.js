import './App.css';
import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
// import Welcome from "./pages/welcome";
// import Exp from  "./pages/experiment";
import Estimate from "./pages/estimate";
import Introduction from "./pages/introduction";
import 'antd/dist/antd.css';

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/">
                {/* <Estimate/> */}
                {/* <Exp path = "D:\Term 7\Hass\psychology-project\client\src\image\number6.png"/> */}
                {/*<Welcome/>*/}
                {/*<Introduction num="10" message={intro} />*/}
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
