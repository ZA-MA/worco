import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import avatarIcon from "./images/pp1.png";
import {UserOutlined} from "@ant-design/icons";

const WorkPlaceNoBron = (props) => {
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
    return (
        <>
            <g onClick={showModal }>
                <circle  stroke="#000000" strokeWidth="5" cx={props.cx} cy={props.cy} r={props.r} fill="blue"/>
                <image y='325.17242' x='469.21225' height='64.422821' width='67.665359'  href={avatarIcon}/>
            </g>

            <Modal title="Место такое-то" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p><UserOutlined /> Человек</p>
                <p>Не забронировано</p>
            </Modal>
        </>
    );
};
export default WorkPlaceNoBron;