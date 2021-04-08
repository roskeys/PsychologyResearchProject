import React, {useState} from "react";
import axios from 'axios';

import Exp from "./pages/experiment";
import Estimate from "./pages/estimate";
import Dice from "./pages/dice";
import Instruction from "./pages/instruction";
import Introduction from "./pages/introduction";
import Thank from "./pages/thanks";
import {
    experiment1_intro_1,
    experiment1_intro_2,
    experiment1_intro_3,
    experiment2_intro_1,
    experiment2_intro_2,
    experiment3_intro
} from "./texts";

import 'antd/dist/antd.css';
import './App.css';

import Smile from "./image/smilingface.png";
import CoinHead from "./image/coin_h.png";
import CoinTail from "./image/coin_t.png";
import Sector14 from "./image/sector14.png";
import Sector34 from "./image/sector34.png";
import number1 from "./image/number1.png";
import number2 from "./image/number2.png";
import number3 from "./image/number3.png";
import number4 from "./image/number4.png";
import number5 from "./image/number5.png";
import number6 from "./image/number6.png";
import Cup from "./pages/cup";

const numbers = [number1, number2, number3, number4, number5, number6];

function buildExperiment(group, sequence, mapping) {
    let experiment = [];
    sequence.forEach(element => {
        let components = mapping[group][element];
        if (Array.isArray(components)) {
            components.forEach(c => {
                experiment.push(c);
            })
        } else {
            experiment.push(components);
        }
    });
    return experiment;
}

function App() {
    const [stage, setStage] = useState(0);
    const [session, setSession] = useState({session_id: null, group1: 0, group2: 0, group3: 0});

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

    const exp1_sequence = [1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0];
    const exp2_sequence = [4, 5, 2, 5, 3, 4, 2, 0, 5, 1, 4, 5, 4, 3, 0, 1, 3, 5, 3, 3, 0, 4, 1, 5, 3];
    const exp3_sequence = session.group3 === 0 ?
        [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1] :
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0];

    const stages = [
        <Cup initialPos={0} nextStage={nextStage}/>,
        <Introduction setSession={setSession} afterSubmit={nextStage}/>,

        ((group)=>{
            switch (group){
                case 0:
                    return <Instruction num="1" message={experiment1_intro_1} nextStage={nextStage}/>
                case 1:
                    return <Instruction num="1" message={experiment1_intro_2} nextStage={nextStage}/>
                case 2:
                    return <Instruction num="1" message={experiment1_intro_3} nextStage={nextStage}/>
                default:
                    return <Instruction num="1" message={experiment1_intro_1} nextStage={nextStage}/>
            }
        })(session.group1),
        ...buildExperiment(session.group1, exp1_sequence, {
            0: {
                0: <Exp path={Smile} left={false} nextStage={nextStage}/>,
                1: <Exp path={Smile} left={true} nextStage={nextStage}/>,
            },
            1: {
                0: <Dice path={CoinTail} nextStage={nextStage}/>,
                1: <Dice path={CoinHead} nextStage={nextStage}/>,
            },
            2: {
                0: <Dice path={Sector34} nextStage={nextStage}/>,
                1: <Dice path={Sector14} nextStage={nextStage}/>,
            }
        }),
        <Estimate min={0} max={100} onSubmit={value => {
            axios.post("/api/exp1/result", {
                session_id: session.session_id,
                estimation: value / 100,
            }).then(() => {
                nextStage();
            });
        }}/>,

        ((group)=>{
            switch (group){
                case 0:
                    return <Instruction num="2" message={experiment2_intro_1} nextStage={nextStage}/>
                case 1:
                    return <Instruction num="2" message={experiment2_intro_2} nextStage={nextStage}/>
                default:
                    return <Instruction num="2" message={experiment2_intro_1} nextStage={nextStage}/>
            }
        })(session.group2),
        ...buildExperiment(session.group2, exp2_sequence, {
            0: numbers.map(number => <Dice path={number} nextStage={nextStage}/>),
            1: numbers.map(number => [
                <Cup initialPos={0} nextStage={nextStage}/>,
                <Dice path={number} nextStage={nextStage}/>
            ]),
        }),
        <Estimate min={0} max={100} onSubmit={value => {
            axios.post("/api/exp2/result", {
                session_id: session.session_id,
                estimation: value / 100,
            }).then(() => {
                nextStage();
            });
        }}/>,

        <Instruction num="3" message={experiment3_intro} nextStage={nextStage}/>,
        ...buildExperiment(0, exp3_sequence, {
            0: {
                0: <Exp path={Smile} left={false} nextStage={nextStage}/>,
                1: <Exp path={Smile} left={true} nextStage={nextStage}/>,
            },
        }),
        <Estimate min={0} max={100} onSubmit={value => {
            axios.post("/api/exp3/result", {
                session_id: session.session_id,
                estimation: value / 100,
            }).then(() => {
                nextStage();
            });
        }}/>,

        <Thank/>
    ];
    return stages[stage];
}

export default App;
