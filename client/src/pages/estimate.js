import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';


class Estimate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 50 };
    }

    render() {
        const { value } = this.state;
        return (
            <div className="outer-background">
                <h2>
                    Use the slider to indicate your estimation: {value}%
                </h2>
                <Slider {...this.props}
                    onChange={value => this.setState({ value })}
                    value={value}
                    style={{
                        height: "30px"
                    }} />
                <button
                    className="estimate"
                    style={{
                        marginTop: "10%"
                    }}
                    onClick={() => this.props.onSubmit(value)}
                >
                    Submit
                </button>
            </div>
        );
    }
}

export default Estimate;
