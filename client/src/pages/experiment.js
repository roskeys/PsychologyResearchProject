import React from 'react';
import 'antd/dist/antd.css';
import {Image} from 'antd';
import {Button} from 'antd';
import "../App.css";

function Exp(props) {
    let left = props.left ? "1" : "0";
    let right = !props.left ? "1" : "0";
    return (
        <div className="outer-background">
            <img
                src={props.path}
                style={{
                    width: "40%",
                    height: "40%",
                    minWidth: "50px",
                    minHeight: "50px",
                    maxWidth: "250px",
                    maxHeight: "250px",
                    opacity: left,
                    paddingLeft: "5%",
                    float: "left"
                }}
                alt={props.path}
            />
            <br/>
            <img
                width={200}
                height={200}
                src={props.path}
                style={{
                    width: "40%",
                    height: "40%",
                    minWidth: "50px",
                    minHeight: "50px",
                    maxWidth: "250px",
                    maxHeight: "250px",
                    opacity: right,
                    paddingRight: "5%",
                    float: "right"
                }}
            />
            <div style={{
                display: "block",
                clear: "both",
                paddingTop: "10%"
            }}/>
            <Button
                className="submit-button"
                onClick={props.nextStage}>
                Next
            </Button>
        </div>
    );
}

export default Exp;