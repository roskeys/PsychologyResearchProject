import React, { useState } from 'react';
import { Form, Button, Radio, InputNumber } from 'antd';

const Welcome = ({ afterSubmit }) => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState("horizontal");
    const [gender, setGender] = useState("M");
    const [age, setAge] = useState(21);


    const submitInfo = () => {
        console.log({ age, gender });
        afterSubmit();
    }

    return (
        <div className="welcome">
            <Form
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
                className="form"
            >
                <Form.Item label="We need your age and gender" name="layout">
                    <Radio.Group value={formLayout}>
                        <Radio.Button value="M" onClick={() => {
                            setGender("M")
                        }}>Male</Radio.Button>
                        <Radio.Button value="F" onClick={() => {
                            setGender("F")
                        }}>Female</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="age">
                    <InputNumber min={0} max={100} defaultValue={21} onClick={(e) => {
                        setAge(e.target.value)
                    }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={() => submitInfo()}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Welcome;