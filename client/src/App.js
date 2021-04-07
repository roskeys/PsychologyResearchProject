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

    const stages = [
        <Introduction setSession={setSession} afterSubmit={nextStage}/>,
    
        <Instruction num="1" message={experiment1_intro} nextStage={nextStage}/>,
        <Exp path={Smile} left={false} nextStage={nextStage}/>,
        <Estimate min={0} max={100} nextStage={nextStage}/>,
    
        <Instruction num="2" message={experiment2_intro} nextStage={nextStage}/>,
        <Dice path={number6} nextStage={nextStage}/>,
        <Cup initialPos={0} nextStage={nextStage}/>,
        <Estimate min={0} max={100} nextStage={nextStage}/>,

        <Instruction num="3" message={experiment3_intro} nextStage={nextStage}/>,
        <Exp path={Smile} left={false} nextStage={nextStage}/>,
        <Estimate min={0} max={100} nextStage={nextStage}/>,

        <Thank/>
    ];
    return stages[stage];
}

export default App;
