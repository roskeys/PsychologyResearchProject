import React from "react";
import cup from "../image/cup.png";

class Cup extends React.Component {
    // https://stackoverflow.com/a/63102915
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            counter: this.props.counter,
            pos: this.props.initialPos,
            dragging: false,
            rel: null
        };
        this.proceed = props.nextStage;
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    }

    onMouseDown = (e) => {
        console.log("Mouse down");
        if (e.button !== 0) return;
        let pos = {left: this.myRef.current.offsetLeft, top: this.myRef.current.offsetTop}
        this.setState({
            dragging: true,
            rel: {
                x: e.pageX - pos.left,
                y: e.pageY - pos.top
            }
        });
        e.stopPropagation();
        e.preventDefault();
    }

    onMouseUp = (e, props) => {
        console.log("Mouse up")
        this.setState({dragging: false});
        e.stopPropagation();
        e.preventDefault();
        this.proceed();
    }

    onMouseMove = (e) => {
        if (!this.state.dragging) return;

        this.setState({
            pos: {
                x: e.pageX - this.state.rel.x,
                y: e.pageY - this.state.rel.y
            }
        });
        e.stopPropagation();
        e.preventDefault();
    }


    render() {
        return (
            <span ref={this.myRef} onMouseDown={this.onMouseDown}
                  style={{position: 'absolute', left: this.state.pos.x + 'px', top: this.state.pos.y + 'px'}}>
                <img src={cup}/>
            </span>
        )
    }
}

export default Cup;
