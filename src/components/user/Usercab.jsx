import React, {useState} from 'react';
import {Avatar, Card, Descriptions, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import * as PropTypes from "prop-types";
import { Divider, Radio, Typography } from 'antd';
const {Text, Paragraph } = Typography;


Text.propTypes = {children: PropTypes.node};
const Usercab = () => {
    const [editableStr, setEditableStr] = useState('Чел какой-то');
    return(
        <>

                <Card title="Личный кабинет">



                    <Paragraph
                        editable={{
                            onChange: setEditableStr,
                        }}

                    >
                        <Avatar size={64} icon={<UserOutlined/>} style={{marginRight: 10}}/>

                        {editableStr}
                    </Paragraph>


                    <Descriptions title="User Info" layout="horizontal" column={1}>
                        <Descriptions.Item label="Ф.И.О." labelStyle={{fontWeight: "bold"}}>Чел какой-то</Descriptions.Item>
                        <Descriptions.Item label="Телефон" labelStyle={{fontWeight: "bold"}}>+7000000000</Descriptions.Item>
                        <Descriptions.Item label="Почта" labelStyle={{fontWeight: "bold"}}>0000@mail.ru</Descriptions.Item>
                        <Descriptions.Item label="Рабочее место" span={1} labelStyle={{fontWeight: "bold"}}> Не забронировано </Descriptions.Item>

                    </Descriptions>
                </Card>

        </>
);
}

export default Usercab;