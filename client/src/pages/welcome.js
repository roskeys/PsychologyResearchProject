import React, {useState} from 'react';
import {Form, Button, Radio, InputNumber} from 'antd';
import "../App.css";
import {general_introduction} from "../introductions"
const Welcome = ({afterSubmit}) => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState("horizontal");
    const [gender, setGender] = useState("M");
    const [age, setAge] = useState(21);
    const submitInfo = () => {
        console.log({age, gender});
        afterSubmit();
    }
    const onFormLayoutChange = ({layout}: { layout: LayoutType }) => {
        setFormLayout(layout);
    };
    return (
        <div className="outer-background">
            <div className="welcome">
                <h1 className="main-titles">
                    Introduction
                </h1>
                <p className="paragraphs">
                    {general_introduction}
                </p>
                <Form
                    layout={formLayout}
                    form={form}
                    initialValues={{
                        layout: formLayout,
                    }}
                    className="form"
                    onValuesChange={onFormLayoutChange}>

                    <h2>Fill in age and gender to proceed</h2>

                    <Form.Item
                        className="form item">
                        <h3>Gender</h3>
                        <Radio.Group value={formLayout}>
                            <Radio.Button
                                value="M"
                                onClick={() => {
                                    setGender("M")
                                }}
                                className="form gender-button">
                                Male
                            </Radio.Button>
                            <Radio.Button
                                value="F"
                                onClick={() => {
                                    setGender("F")
                                }}
                                className="form age-button">
                                Female
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <h3>Age</h3>
                        <InputNumber
                            min={0} max={100} defaultValue={21}
                            onClick={(e) => {
                                setAge(e.target.value)
                            }}
                            className="form age"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => submitInfo()}
                            className="form submit-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Welcome;
