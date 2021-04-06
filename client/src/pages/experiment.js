import React from 'react';
import {Button} from 'antd';
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
                        width: "45%",
                        height: "45%",
                        opacity: left,
                        paddingLeft: "10%",
                        float: "left"
                    }}
                    alt={props.path}
                />
                <img
                    width={200}
                    height={200}
                    src={props.path}
                    style={{
                        width: "45%",
                        height: "45%",
                        opacity: right,
                        paddingRight: "10%",
                        float: "right"
                    }}
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
