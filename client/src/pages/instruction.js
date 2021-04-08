import React from 'react';
import "../App.css"

function Instruction(props) {
    return (
        <div className="outer-background" style={{
            paddingTop: "5%"
        }}>
            <h1>
                Game {props.num}
            </h1>
            <p>
                {props.message}
            </p>
            <button
                className="submit-button"
                onClick={props.nextStage}>
                Start
            </button>
        </div>
    );
}

export default Instruction;
