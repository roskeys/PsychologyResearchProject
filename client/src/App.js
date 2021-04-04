import React, {useState} from "react";
import Welcome from './pages/welcome';
import 'antd/dist/antd.css';
import './App.css';
import Cup from "./pages/cup";
import Introduction from "./pages/introduction";
import Thank from "./pages/thanks";
import {experiment1_intro, experiment2_intro, experiment3_intro} from "./introductions";

function App() {
    const [stage, setStage] = useState(0);
    const nextStage = function () {
        let step = 1;
        while (!((stage + step) in stages) && (step < 100)) {
            step += 1;
        }
        if ((stage + step) in stages) {
            setStage(stage + step);
        } else {
            setStage(100);
        }
    }

    const stages = {
        0: <Welcome afterSubmit={nextStage}/>,
        1: <Introduction num="1" message={experiment1_intro} nextStage={nextStage}/>,
        5: <Cup initialPos={0} nextStage={nextStage}/>,
        35: <Introduction num="2" message={experiment2_intro} nextStage={nextStage}/>,
        55: <Introduction num="3" message={experiment3_intro} nextStage={nextStage}/>,
        100: <Thank/>
    };
    return stages[stage];
}

export default App;
