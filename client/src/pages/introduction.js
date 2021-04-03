import React from 'react';
import "../App.css"
function Introduction(props){
    return (
        <div className="outer-background">
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

export default Introduction;
