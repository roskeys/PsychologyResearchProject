import React from 'react';
import "../App.css";

function Exp(props) {
    let left = props.left ? "1" : "0";
    let right = !props.left ? "1" : "0";
    return (
        <div className="outer-background">
            <div>
                <img
                    src={props.path}
                    style={{
                        width: "auto",
                        height: "auto",
                        opacity: left,
                        float: "left",
                        minWidth: "100px",
                        minHeight: "100px",
                        maxWidth: "200px",
                        maxHeight: "200px"
                    }}
                    alt={props.path}
                />
                <img
                    src={props.path}
                    style={{
                        width: "auto",
                        height: "auto",
                        opacity: right,
                        float: "right",
                        minWidth: "100px",
                        minHeight: "100px",
                        maxWidth: "200px",
                        maxHeight: "200px"
                    }}
                    alt={props.path}
                />
            </div>
            <div style={{
                display: "block",
                clear: "both",
                paddingTop: "10%"
            }}/>
            <button
                className="submit-button"
                onClick={props.nextStage}>
                Next
            </button>
        </div>
    );
}

export default Exp;
