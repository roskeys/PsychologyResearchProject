import React, { useState } from "react";
import Exp from "./pages/experiment";

import Estimate from "./pages/estimate";
import Dice from "./pages/dice";
import Instruction from "./pages/instruction";
import Introduction from "./pages/introduction";
import Thank from "./pages/thanks";
import { experiment1_intro, experiment2_intro, experiment3_intro } from "./texts";

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
    const [session, setSession] = useState({ group1: 0, group2: 0, group3: 0 });

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

    const exp1_sequence = [0, 1];
    const exp2_sequence = [0, 1, 2, 3, 4, 5];
    const exp3_sequence = session.group3 === 0 ?
        [0, 1] :
        [1, 0];

    const stages = [
        <Introduction setSession={setSession} afterSubmit={nextStage} />,

        <Instruction num="1" message={experiment1_intro} nextStage={nextStage} />,
        ...buildExperiment(session.group1, exp1_sequence, {
            0: {
                0: <Exp path={Smile} left={false} nextStage={nextStage} />,
                1: <Exp path={Smile} left={true} nextStage={nextStage} />,
            },
            1: {
                0: <Dice path={CoinTail} nextStage={nextStage} />,
                1: <Dice path={CoinHead} nextStage={nextStage} />,
            },
            2: {
                0: <Dice path={Sector14} nextStage={nextStage} />,
                1: <Dice path={Sector34} nextStage={nextStage} />,
            }
        }),
        <Estimate min={0} max={100} nextStage={nextStage} />,

        <Instruction num="2" message={experiment2_intro} nextStage={nextStage} />,
        ...buildExperiment(session.group2, exp2_sequence, {
            0: numbers.map(number => <Dice path={number} nextStage={nextStage} />),
            1: numbers.map(number => [
                <Cup initialPos={0} nextStage={nextStage} />,
                <Dice path={number} nextStage={nextStage} />
            ]),
        }),
        <Estimate min={0} max={100} nextStage={nextStage} />,

        <Instruction num="3" message={experiment3_intro} nextStage={nextStage} />,
        ...buildExperiment(0, exp3_sequence, {
            0: {
                0: <Exp path={Smile} left={false} nextStage={nextStage} />,
                1: <Exp path={Smile} left={true} nextStage={nextStage} />,
            },
        }),
        <Estimate min={0} max={100} nextStage={nextStage} />,

        <Thank />
    ];
    return stages[stage];
}

export default App;
