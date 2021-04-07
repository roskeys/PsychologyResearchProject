import React from 'react';
import 'antd/dist/antd.css';
import {Slider} from 'antd';

class Estimate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.proceed = props.nextStage;
    }


    handleChange = value => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;
        return (
            <div className="outer-background">
                <h2>
                Use the slider to indicate your estimation
                </h2>
                <Slider {...this.props}
                        onChange={this.handleChange}
                        value={value}
                        style={{
                            height: "30px"
                        }}/>
                <button
                    className="submit-button"
                    style={{
                        marginTop: "10%"
                    }}
                    onClick={this.proceed}>
                    Submit
                </button>
            </div>
        );
    }
}

export default Estimate;