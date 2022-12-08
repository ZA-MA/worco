import React, {useEffect, useState} from 'react';
import './index.css';
import {BrowserRouter, Route, Routes, Link, Router} from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DesktopOutlined,
    UserOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
//import {Route} from "react-router-dom";

import Test1 from "./Test1";
import Entry from "./Entry";
import Usercab from "./user/Usercab";
import InteractiveMap from "./InteractiveMap";
import * as ReactRouterDOM from "react-router";
const { Header, Sider, Content } = Layout;


const Main = () => {





    const useNavigate = ReactRouterDOM.useNavigate;
    const navigate = useNavigate();
    const verifyAuth = () => {
        if(!localStorage.getItem('Auth')) {
            navigate(`/`);
        }

        // stay on this route since the user is not authenticated
    }
    const [collapsed, setCollapsed] = useState(false);
    const [dataUser, setDataUser] = useState({})
    async function getDataUser() {
        const formData = new FormData();
        formData.append('cmd', 'GET')
        formData.append('user', localStorage.getItem('UserName'))
        let response;
        response = await fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(response => response.json())
        setDataUser(response)
        console.log(dataUser.status)

        // fetch('http://localhost:80/worco/', {method:'PUT', headers: {'Content-type': 'application/json; charset=UTF-8'}, body: formData}).then(response => response.json()).then(response =>{
        //     console.log(response)})


        // fetch('http://localhost:80/worco', {
        //     mode: 'no-cors',
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify()
        // }).then(response => response.json()).then(response =>{
        //     console.log(response)})
    }
    const CheckStatusUser = () =>{

        if(dataUser.status === 'admin'){
            return false
        }else if(dataUser.status === 'user'){
            return true
        }else {
            return true
        }
    };
    useEffect(() => {
        verifyAuth();
        getDataUser()

    }, []);
    return (


            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: "#293240"}} >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]} style={{backgroundColor: "#293240"}}>
                        <Menu.Item key="/accaunt" >
                            <UserOutlined />
                            <span style={{fontFamily:"Montserrat", fontWeight:"1000" }}>Личный кабинет</span>
                            <Link to="/accaunt" />
                        </Menu.Item>
                        <Menu.Item key="/bron" >
                            <DesktopOutlined />
                            <span style={{fontFamily:"Montserrat", fontWeight:"1000"  }}>Карта офиса</span>
                            <Link to="/bron" />
                        </Menu.Item>
                        <Menu.Item key="/stat" disabled={CheckStatusUser().valueOf()}>
                            <LineChartOutlined />
                            <span style={{fontFamily:"Montserrat", fontWeight:"1000" }}>Статистика</span>
                            <Link to="/stat" />
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: window.screen.height - 235,

                        }} >

                        <Routes>
                            <Route path="accaunt" element={<Usercab/>} />
                            <Route path="bron" element={<InteractiveMap/>} />
                            <Route path="stat" element={<Test1/>} />
                        </Routes>

                    </Content>
                </Layout>
            </Layout>


    );
};


export default Main;