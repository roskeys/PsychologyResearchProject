import React from 'react';
import "../App.css";

function Dice(props) {
    return (
        <div className="outer-background">
            <h2>Press "Next" button to go to next round</h2>
            <div style={{
                margin: "0 auto"
            }}>
                <img
                    src={props.path}
                    style={{
                        width: "auto",
                        height: "auto",
                        margin: "0 auto",
                        display: "block",
                        minWidth: "200px",
                        minHeight: "200px",
                        maxWidth: "400px",
                        maxHeight: "400px",
                        objectFit: "fill"
                    }}
                    alt={props.path}/>
            </div>
            <button
                className="submit-button"
                onClick={props.nextStage}>
                Next
            </button>
        </div>
    );
}

export default Dice;
