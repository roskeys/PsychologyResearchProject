import React, {useState} from 'react';
import {Form, Button, Radio, InputNumber} from 'antd';

const Welcome = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState("horizontal");
    const [gender, setGender] = useState("M");
    const [age, setAge] = useState(21);

    // const formItemLayout = {
    //     labelCol: {span: 4},
    //     wrapperCol: {span: 14}
    // };
    //
    // const buttonItemLayout = {
    //     wrapperCol: {
    //         span: 14,
    //         offset: 4,
    //     }
    // };

    const submitInfo = () => {
        console.log(age, gender);
    }

    return (
        <div>
            <Form
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}>
                <Form.Item label="Form Layout" name="layout">
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
                    }}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={() => submitInfo()}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Welcome;