import React, { useState, useMemo, useEffect } from 'react';
// eslint-disable-next-line semi-design/no-import
import { Table, Avatar, AvatarGroup } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';
import * as dateFns from 'date-fns';
import './index.scss';

const DAY = 24 * 60 * 60 * 1000;
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';

const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        fixed: true,
        width: 250,
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: 12 }}></Avatar>
                    {text}
                </div>
            );
        },
        filters: [
            {
                text: 'Semi Design 设计稿',
                value: 'Semi Design 设计稿',
            },
            {
                text: 'Semi Pro 设计稿',
                value: 'Semi Pro 设计稿',
            },
        ],
        onFilter: (value, record) => record.name.includes(value),
    },
    {
        title: '大小',
        dataIndex: 'size',
        width: 200,
        sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
        render: text => (
            <div>
                <AvatarGroup>
                    <Avatar color="red" alt="Lisa LeBlanc">
                        LL
                    </Avatar>
                    <Avatar alt="Caroline Xiao">CX</Avatar>
                    <Avatar color="amber" alt="Rafal Matin">
                        RM
                    </Avatar>
                </AvatarGroup>
            </div>
        ),
    },
    {
        title: '所有者',
        dataIndex: 'owner',
        // width: 200,
        render: (text, record, index) => {
            return (
                <div>
                    <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
                        {typeof text === 'string' && text.slice(0, 1)}
                    </Avatar>
                    {text}
                </div>
            );
        },
    },
    {
        title: '更新日期',
        dataIndex: 'updateTime',
        width: 200,
        sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
        render: value => {
            return dateFns.format(new Date(value), 'yyyy-MM-dd');
        },
    },
    {
        title: '',
        dataIndex: 'operate',
        fixed: 'right' as const,
        align: 'center' as const,
        width: 100,
        render: () => {
            return <IconMore />;
        },
    },
];

App.storyName = '固定表头';
function App() {
    const [dataSource, setData] = useState([]);

    const scroll = useMemo(() => ({ x: 1200 }), []);
    const rowSelection = useMemo(
        () => ({
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Michael James', // Table.Column configuration not to be checked
                name: record.name,
            }),
            fixed: true,
        }),
        []
    );

    const getData = () => {
        const data = [];
        for (let i = 0; i < 46; i++) {
            const isSemiDesign = i % 2 === 0;
            const randomNumber = (i * 1000) % 199;
            data.push({
                key: '' + i,
                name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
                owner: isSemiDesign ? '姜鹏志' : '郝宣',
                size: randomNumber,
                updateTime: new Date('2023-01-31').valueOf() + randomNumber * DAY,
                avatarBg: isSemiDesign ? 'grey' : 'red',
            });
        }
        return data;
    };

    useEffect(() => {
        const data = getData();
        setData(data);
    }, []);

    return (
        <div style={{ height: '250vh' }}>
            <div style={{ marginTop: 200 }}>
                <h4>top = 100</h4>
                <div>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        scroll={scroll}
                        sticky={{ top: 100 }}
                    />
                </div>
            </div>
            <div>
                <h4>top = 100 + no fixed column</h4>
                <div>
                    <Table dataSource={dataSource} rowSelection={rowSelection} sticky={{ top: 100 }} scroll={scroll}>
                        <Table.Column title="标题" dataIndex="name" key="name" />
                        <Table.Column title="大小" dataIndex="size" key="size" />
                        <Table.Column title="所有者" dataIndex="owner" key="owner" />
                        <Table.Column title="更新时间" dataIndex="updateTime" key="updateTime" />
                        <Table.Column title="" dataIndex="operate" key="operate" />
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default App;
