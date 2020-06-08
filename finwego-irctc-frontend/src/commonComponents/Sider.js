import React from 'react';
import * as _ from "lodash";
import { Layout, Menu } from 'antd';
import {
  OrderedListOutlined,
  SnippetsOutlined,
  FileAddOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export default (props) => {

    const selectedKeys = _.filter(["ticket-booking", "booking-histrory", "add-new-train"], (key) => {
        return props.pathname.includes(key);
    })
    console.log("selected Keys ", selectedKeys, props.pathname);

    return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
        <div className="logo" />
        <Menu 
            theme="dark" 
            mode="inline" 
            selectedKeys={selectedKeys}
            onClick={props.changeRoute}
        >
            <Menu.Item 
                key="ticket-booking"
                title="Ticket Booking"
                icon={<SnippetsOutlined />}
            >
                Ticket Booking
            </Menu.Item>
            <Menu.Item 
                key="booking-histrory"
                title="Booking History"
                icon={<OrderedListOutlined />}
            >
                Booking History
            </Menu.Item>
            {props.isAdmin ? <Menu.Item 
                key="add-new-train"
                title="Add New Train"
                icon={<FileAddOutlined />}
            >
                Trains Management
            </Menu.Item> : null}
        </Menu>
    </Sider>
    )
}
