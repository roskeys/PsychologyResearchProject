import React from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import range from 'lodash.range';

class Cup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 250,
            y: 300,
            ts: Date.now()
        };
        this.proceed = props.nextStage;
    };

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseUp = (e) => {
        console.log(Date.now() - this.state.ts);
        if (Date.now() - this.state.ts > 1000) {
            e.stopPropagation();
            e.preventDefault();
            this.proceed();
        }
    }

    handleMouseMove = ({pageX: x, pageY: y}) => {
        this.setState({x, y});
    };

    handleTouchMove = ({touches}) => {
        this.handleMouseMove(touches[0]);
    };

    getStyles = (prevStyles) => {
        const endValue = prevStyles.map((_, i) => {
            return i === 0
                ? this.state
                : {
                    x: spring(prevStyles[i - 1].x, presets.gentle),
                    y: spring(prevStyles[i - 1].y, presets.gentle),
                };
        });
        return endValue;
    };

    render() {
        return (
            <div>
                <div style={{
                    textAlign: "center"
                }}>
                    <h4>Drag and shake the cup, release to continue.</h4>
                    <br/>
                    <h5>If release does not proceed, click the cup icon to proceed.</h5>
                </div>
                <StaggeredMotion
                    defaultStyles={range(1).map(() => ({x: 0, y: 0}))}
                    styles={this.getStyles}>
                    {balls =>
                        <div className="cup-base">
                            {balls.map(({x, y}, i) =>
                                <div
                                    key={i}
                                    className={`cup cup-${i}`}
                                    style={{
                                        WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                                        transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                                        zIndex: balls.length - i,
                                    }}/>
                            )}
                        </div>
                    }
                </StaggeredMotion>
                <br/>
            </div>
        );
    };
}

export default Cup;
