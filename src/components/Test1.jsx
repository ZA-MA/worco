import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

import { Calendar } from 'antd';

import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = `
  Было: столько-то
`;

const Test1 = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);

    };
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div>
            <div className="site-calendar-demo-card" style={{
                width: '300px',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
            }}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="День такой-то" key="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="День такой-то" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="День такой-то" key="3">
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    );
};

export default Test1;