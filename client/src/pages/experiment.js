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
                        // paddingLeft: "10%",
                        float: "left",
                        minWidth: "200px",
                        minHeight: "200px",
                        maxWidth: "400px",
                        maxHeight: "400px"
                    }}
                    alt={props.path}
                />
                <img
                    width={200}
                    height={200}
                    src={props.path}
                    style={{
                        width: "auto",
                        height: "auto",
                        opacity: right,
                        // paddingRight: "10%",
                        float: "right",
                        minWidth: "200px",
                        minHeight: "200px",
                        maxWidth: "400px",
                        maxHeight: "400px"
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
