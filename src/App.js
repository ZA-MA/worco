import React, { useState } from 'react';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DesktopOutlined,
    UserOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
//import {Route} from "react-router-dom";

import Test1 from "./components/Test1";
import Entry from "./components/Entry";
import Usercab from "./components/user/Usercab";
const { Header, Sider, Content } = Layout;


const App = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <BrowserRouter>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}  >
                    <Menu.Item key="/account">
                        <UserOutlined />
                        <span>Личный кабинет</span>
                        <Link to="/account" />
                    </Menu.Item>
                    <Menu.Item key="/bron" >
                        <DesktopOutlined />
                        <span>Бронь</span>
                        <Link to="/bron" />
                    </Menu.Item>
                    <Menu.Item key="/stat">
                        <LineChartOutlined />
                        <span>Статистика</span>
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
                        minHeight: 500,
                    }} >
                    <Routes style={{minHeight:500}}>
                        <Route path="/" element={<Entry/>} />
                        <Route path="/account" element={<Usercab/>} />
                        <Route path="/bron" element={<Test1/>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
        </BrowserRouter>

    );
};


export default App;