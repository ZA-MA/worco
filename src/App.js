import React, { useState } from 'react';
import './components/index.css';
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
import InteractiveMap from "./components/InteractiveMap";
import Main from "./components/Main";
const { Header, Sider, Content } = Layout;


const App = () => {


    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entry />}/>
                <Route path="/*" element={<Main />}>

                </Route>
            </Routes>
        </BrowserRouter>

    );
};


export default App;