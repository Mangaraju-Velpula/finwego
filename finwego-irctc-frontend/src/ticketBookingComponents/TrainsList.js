/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Table, Space, Button} from 'antd'

const { Column  } = Table;

export default class TrainsList extends React.Component {

    onBookTicket = (train) => {
        console.log("on Bolling sdjf ", train);
        this.props.onBookTicketClick(train)
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
                        return (<Button 
                                    type="primary" 
                                    onClick={() => {this.onBookTicket(props)}}> 
                                        Book Tickets
                                </Button>);
                    }} 
                />
            </Table>
        )
    }
}