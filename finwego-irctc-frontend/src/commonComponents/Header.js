import React from 'react';
import { Layout, Button, Radio } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { users } from '../constants';
const { Header } = Layout;

export default (props) => {
    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: props.toggle,
            })}
            <div className="users-elements">
            <Radio.Group value={props.currentUser} onChange={props.changeUser}>
                {
                    users.map((user) => <Radio.Button value={user.id}>{user.name + " (" + user.role+")"}</Radio.Button>)
                }
            </Radio.Group>
            </div>
      </Header>
    )
}