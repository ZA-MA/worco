import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import {Link, Router} from "react-router-dom";
import * as ReactRouterDOM from "react-router";
import './entry.css'
const Entry = () => {
    const useNavigate = ReactRouterDOM.useNavigate;
    const navigate = useNavigate();
    const onFinish = (values) => {

        var formData = new FormData();
        formData.append('cmd', 'LOGIN');
        formData.append('login', values.username);
        formData.append('pass', values.password);
        fetch('http://localhost/worco/', {method:'POST', body: formData})
            .then(response => response.json())
            .then(response =>{

                console.log(response.login)
            if(response.login === values.username && response.password === values.password){
                console.log('Success:', response);

                navigate(`/accaunt`);
                localStorage.setItem('UserName', response.name)
                localStorage.setItem('Auth', 'true')
                localStorage.setItem('Place', response.workplace_id)

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
            name="normal_login"
            labelCol={{
                span: 8,
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
            <div className="logo1" />

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
                    offset: 11,
                    span: 11,
                }}

            >
                <Checkbox >Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 11,
                    span: 11,
                }}

            >
                <Button type="primary" htmlType="submit"  style={{width: 120, backgroundColor: '#FF0000' }}>

                    Войти
                </Button>
            </Form.Item>
        </Form>

    );
};

export default Entry;