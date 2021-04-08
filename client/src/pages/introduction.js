import React from 'react';
import {Form, InputNumber, Radio} from 'antd';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';
import './introduction.css';

const Introduction = ({afterSubmit, setSession}) => {

    const submitInfo = async (form) => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        form["fingerprint"] = result.visitorId;

        axios.post("/api/register", form).then(res => {
            setSession(res.data);
            afterSubmit();
        });
    }
    return (
        <div className="introduction-page">
            <div className="welcome">
                <h1 className="main-titles" style={{paddingTop: 50}}>
                    Welcome🎉
                </h1>
                <div style={{margin: "auto", padding: "10px 20px", maxWidth: 800, marginBottom: 40}}>
                    <div style={{fontSize: 18, marginBottom: 15}}>
                        We are a group of students from Singapore University of Technology and Design (SUTD)
                        doing a project for our psychology course. In this project, we focus on the factors
                        that affect people’s estimation of the probability of random events.
                    </div>
                    <div style={{fontSize: 18}}>
                        Participation is completely voluntary and the information collected will be completely
                        anonymous. Your age and gender are required for our later analysis. The experiment
                        consists of three parts, each takes less than 3 minutes. You can easily participate by
                        clicking buttons and dragging objects on the screen. If you have about 5-10 mins to
                        spare, please do help us out with our experiments. It will be fun! Thanks a lot!
                    </div>
                </div>
                <Form className="form" onFinish={submitInfo}>
                    <h4>Gender</h4>
                    <Form.Item
                        name="gender"
                        rules={[{required: true, message: 'Please choose your gender'}]}
                    >
                        <Radio.Group>
                            <Radio.Button value="M">Male</Radio.Button>
                            <Radio.Button value="F">Female</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <h4>Age</h4>
                    <Form.Item name="age" initialValue={21}>
                        <InputNumber min={0} max={100}/>
                    </Form.Item>

                    <Form.Item style={{marginTop: 50}}>
                        <button className="start-button" type="submit">
                            Start
                        </button>
                    </Form.Item>
                </Form>
                <div style={{height: 50}}> </div>
            </div>
        </div>
    );
}

export default Introduction;
