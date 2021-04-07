import React, {useState} from "react";
import Exp from "./pages/experiment";
import 'antd/dist/antd.css';
import './App.css';
import Cup from "./pages/cup";
import Smile from "./image/smilingface.png";
import number6 from "./image/number6.png";
import Thank from "./pages/thanks";
import {experiment1_intro, experiment2_intro, experiment3_intro} from "./texts";
import Estimate from "./pages/estimate";
import Dice from "./pages/dice";
import Instruction from "./pages/instruction";
import Introduction from "./pages/introduction";

function App() {
    const [stage, setStage] = useState(0);
    const [session, setSession] = useState(null);

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
        0: <Introduction setSession={setSession} afterSubmit={nextStage}/>,
        15: <Exp path={Smile} left={false} nextStage={nextStage}/>,
        1: <Dice path={number6} nextStage={nextStage}/>,
        5: <Estimate min={0} max={100} nextStage={nextStage}/>,
        10: <Exp path={number6} left={false} nextStage={nextStage}/>,
        2: <Cup nextStage={nextStage}/>,
        25: <Instruction num="1" message={experiment1_intro} nextStage={nextStage}/>,
        30: <Cup initialPos={0} nextStage={nextStage}/>,
        35: <Instruction num="2" message={experiment2_intro} nextStage={nextStage}/>,
        55: <Instruction num="3" message={experiment3_intro} nextStage={nextStage}/>,
        100: <Thank/>
    };
    return stages[stage];
}

export default App;
