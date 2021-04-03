import React from "react";
import cup from "../image/cup.png";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

function Cup() {
    console.log(cup);
    return (
        <div className="container">
            <h1>Shake the cup</h1>
            <DndProvider backend={HTML5Backend}>
                <img src={cup} alt="CUP"/>
            </DndProvider>
        </div>
    );
}

export default Cup;