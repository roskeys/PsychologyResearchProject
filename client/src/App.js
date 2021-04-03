import React, {useState} from "react";
import Welcome from './pages/welcome';
import 'antd/dist/antd.css';
import './App.css';
import Cup from "./pages/cup";

function SamplePage(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={props.nextStage}>Next Page</button>
        </div>
    );
}

function App() {
    const [stage, setStage] = useState(0);
    const nextStage = function () {
        setStage(stage + 1);
    }
    const stages = {
        0: <Cup initialPos={0} nextStage={nextStage}/>,
        // 0: <Welcome afterSubmit={nextStage} />,
        1: <SamplePage title="Page 2" nextStage={nextStage}/>,
        2: <SamplePage title="Page 3" nextStage={nextStage}/>,
        3: <SamplePage title="Page 4" nextStage={nextStage}/>,
        4: <SamplePage title="Page 5" nextStage={nextStage}/>,
    };
    return stages[stage];
}

export default App;
