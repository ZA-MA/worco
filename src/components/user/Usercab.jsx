import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Descriptions, Modal, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import * as PropTypes from "prop-types";
import { Divider, Radio, Typography } from 'antd';
import * as ReactRouterDOM from "react-router";
const {Text, Paragraph } = Typography;



Text.propTypes = {children: PropTypes.node};
const Usercab = () => {
    const date = require('date-and-time');
    const now = new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //const [editableStr, setEditableStr] = useState('Чел какой-то');
    let [dataUser, setDataUser] = useState([]);
    function getDataUser(){

        const formData = new FormData();
        formData.append('cmd', 'GET')
        formData.append('user', localStorage.getItem('User'))
        fetch('http://localhost:80/worco/', {method: 'POST', body: formData})
            .then(response => response.json())
            .then(response => {
                setDataUser(response);
                console.log(response)
            });
    }

    useEffect(() => {
        getDataUser()
    }, []);
    const useNavigate = ReactRouterDOM.useNavigate;
    const navigate = useNavigate();
    function exitUser(){
        localStorage.clear();
        navigate('/');
    }
    return(
        <>




                    <Paragraph


                    >
                        <Avatar size={64} icon={<UserOutlined/>} style={{marginRight: 10}}/>
                        <Text>{dataUser.name}</Text>
                    </Paragraph>


                    <Descriptions title="User Info" layout="horizontal" column={1}>
                        <Descriptions.Item label="Телефон" labelStyle={{fontWeight: "bold"}}>+ {dataUser.phone}</Descriptions.Item>
                        <Descriptions.Item label="Почта" labelStyle={{fontWeight: "bold"}}>{dataUser.mail}</Descriptions.Item>
                        <Descriptions.Item label={`Рабочее место на ${date.format(now, 'DD MMM')}`} span={1} labelStyle={{fontWeight: "bold"}}> Не забронировано </Descriptions.Item>
                    </Descriptions>


                    <svg width="60" height="100" onClick={showModal}>
                        <circle cx='30' cy='30' r='25' fill="#aeaeae"/>
                        <text x="50%" y="30%" textAnchor="middle" fill="white" fontSize="12px" fontFamily="Arial" dy=".3em">21</text>
                    </svg>

                    <svg width="300" height="100" onClick={showModal}>
                        <circle cx='30' cy='30' r='25' fill="#aeaeae"/>
                        <text x="10%" y="30%" textAnchor="middle" fill="white" fontSize="12px" fontFamily="Arial" dy=".3em">21</text>
                    </svg>

                    <Modal title="Место такое-то" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p><UserOutlined /> Человек</p>
                        <p>Забронировано</p>
                    </Modal>
            {/*<svg width="250" height="250">*/}
            {/*    <circle cx="125" cy="125" r="100" fill="#aeaeae" />*/}
            {/*    <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="100px" font-family="Arial" dy=".3em">BC</text>*/}
            {/*    Sorry, your browser does not support inline SVG.*/}
            {/*</svg>*/}
            <Button type="primary" onClick={exitUser}>Выход</Button>
        </>
);
}

export default Usercab;