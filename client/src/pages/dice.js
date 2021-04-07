import React from 'react';
import "../App.css";

function Dice(props) {
    return (
        <div className="outer-background">
            <div>
                <img
                    src={props.path}
                    style={{
                        width: "60%",
                        height: "60%",
                        margin: "0 auto",
                        maxWidth: "400px",
                        maxHeight: "400px",
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
