import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import range from 'lodash.range';
import './cup.css';

class Cup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: document.body.scrollWidth / 2 - 50,
            y: 200,
            ts: Date.now(),
            pressed: false
        };
        // this.toggleFullScreen();
        console.log(this.state);
        this.proceed = props.nextStage;
    };

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener("touchend", this.handleMouseUp);
        window.addEventListener("touchstart", this.handleMouseDown);
    };

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener("touchend", this.handleMouseUp);
        window.removeEventListener("touchstart", this.handleMouseDown);
    }

    handleMouseUp = (e) => {
        console.log(Date.now() - this.state.ts);
        if (Date.now() - this.state.ts > 1000) {
            e.stopPropagation();
            e.preventDefault();
            this.proceed();
        }
    }

    handleMouseDown = (e) => {
        this.setState(
            {
                ts: Date.now(),
                pressed: true
            })
    }

    handleMouseMove = ({ pageX: x, pageY: y }) => {
        if (this.state.pressed) {
            this.setState({ x: x - 50, y: y - 240 });
        }
    };

    handleTouchMove = ({ touches }) => {
        this.handleMouseMove(touches[0]);
    };

    getStyles = (prevStyles) => {
        const endValue = prevStyles.map((_, i) => {
            return i === 0
                ? this.state
                : {
                    x: spring(Math.max(prevStyles[i - 1].x, document.body.clientWidth), presets.gentle),
                    y: spring(Math.max(prevStyles[i - 1].y, document.body.clientHeight), presets.gentle),
                };
        });
        return endValue;
    };

    render() {
        return (
            <div className="cup-outer" style={{ height: "100%" }}>
                <div className="cup-instruction">
                    <h4>Drag and shake the cup, release to continue.</h4>
                    <br />
                    <h5>If release does not proceed, click the cup icon to proceed.</h5>
                </div>
                <StaggeredMotion
                    defaultStyles={range(1).map(() => ({ x: 0, y: 0 }))}
                    styles={this.getStyles}>
                    {balls =>
                        <div className="cup-base">
                            {balls.map(({ x, y }, i) =>
                                <div
                                    key={i}
                                    className={`cup cup-${i}`}
                                    style={{
                                        WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                                        transform: `translate3d(${x}px, ${y}px, 0)`,
                                        zIndex: balls.length - i,
                                    }} />
                            )}
                        </div>
                    }
                </StaggeredMotion>
                <footer />
            </div>
        );
    };
}

export default Cup;
