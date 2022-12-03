import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import {Link, Router} from "react-router-dom";
import * as ReactRouterDOM from "react-router";

const Entry = () => {
    const useNavigate = ReactRouterDOM.useNavigate;
    const navigate = useNavigate();
    const onFinish = (values) => {

        var formData = new FormData();
        formData.append('cmd', 'LOGIN');
        formData.append('login', values.username);
        formData.append('pass', values.password);
        fetch('http://localhost/worco/', {method:'POST', body: formData})
            .then(response => response.text())
            .then(response =>{


            if(response === "Success"){
                console.log('Success:', values);

                navigate(`/account`);
                localStorage.setItem('User', values.username)
                localStorage.setItem('Auth', 'true')

            }

        })




    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const  onSubmit = () => {



    };
    return (

        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 8,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" >

                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Entry;