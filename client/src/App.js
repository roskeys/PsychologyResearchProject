import React, {useState} from "react";
import Welcome from './pages/welcome';
import Exp from "./pages/experiment";
import 'antd/dist/antd.css';
import './App.css';
import Cup from "./pages/cup";
import Smile from "./image/smilingface.png";
import number6 from "./image/number6.png";
import Introduction from "./pages/introduction";
import Thank from "./pages/thanks";
import {experiment1_intro, experiment2_intro, experiment3_intro} from "./introductions";
import Estimate from "./pages/estimate";
import Dice from "./pages/dice";

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
        0: <Exp path={Smile} left={false} nextStage={nextStage}/>,
        1: <Dice path={number6} nextStage={nextStage}/>,
        5: <Estimate min={0} max={100} nextStage={nextStage}/>,
        10: <Exp path={number6} left={false} nextStage={nextStage}/>,
        15: <Cup nextStage={nextStage}/>,
        20: <Welcome afterSubmit={nextStage}/>,
        25: <Introduction num="1" message={experiment1_intro} nextStage={nextStage}/>,
        30: <Cup initialPos={0} nextStage={nextStage}/>,
        35: <Introduction num="2" message={experiment2_intro} nextStage={nextStage}/>,
        55: <Introduction num="3" message={experiment3_intro} nextStage={nextStage}/>,
        100: <Thank/>
    };
    return stages[stage];
}

export default App;
