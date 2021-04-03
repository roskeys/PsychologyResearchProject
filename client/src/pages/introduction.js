import React from 'react';

function Introduction(props){
    return (
        <div className="welcome">
           <h1>
               Experiment {props.num}
           </h1>
            <p>
                {props.message}
            </p>
        </div>
    );
}

export default Introduction;