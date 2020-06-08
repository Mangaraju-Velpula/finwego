/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Table, Space} from 'antd'

const { Column  } = Table;

export default class Trains extends React.Component {

    onEdit = (train) => {
        this.props.onEdit(train);
    }

    onDelete = (train) => {
        this.props.onDelete(train);
    }

    showTrainDetails = (train) => {
        this.props.onTrainDetails(train);
    }

    render() {
        return(
            <Table 
                dataSource = {this.props.trains}
            >
                <Column 
                    title="Train Name" 
                    dataIndex="" 
                    key="name" 
                    render = {
                        (props) => {
                            console.log("props ", props);
                            return <a onClick={() => {this.showTrainDetails(props)}}> {props.name} </a>
                        }
                    }
                />
                <Column title="Train Number" dataIndex="number" key="name" />
                <Column 
                    title="Starting Point" 
                    dataIndex="from" 
                    key="from" 
                    render= {(from) => {
                        return from.name
                    }} 
                />
                 <Column 
                    title="Destination Point" 
                    dataIndex="to" 
                    key="to" 
                    render= {(to) => {
                        return to.name
                    }} 
                />
                <Column 
                    title="Actions" 
                    dataIndex="" 
                    key="actions" 
                    render={(props) => {
                        return (<Space size="middle">
                                    <a onClick={() => {
                                        this.onEdit(props);
                                    }}>
                                        Edit
                                    </a>
                                    <a  onClick={() => {
                                        this.onDelete(props);
                                    }}>Delete</a>
                                </Space>);
                    }} 
                />
            </Table>
        )
    }
}