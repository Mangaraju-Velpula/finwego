import React from 'react';
import * as _ from 'lodash';
import { v4 as guid } from 'uuid';

import {Row, Col, Modal, Form, Input, Button, Select, Divider, message, Spin } from 'antd';
import {PEOPLECATOGORIES, 
        GENDERS,
    APIURLS ,users, HTTP_RESPONSES} from '../constants';

const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};

class BookingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noOfTickets : 0,
            tickets: {},
            bookingId: 1,
            isLoading: false,
        }
        this.formRef = React.createRef();
    }

    currentUser = (currentUserId) => {
		// if()
		const user = _.find(users, (user) => {
			return user.id === currentUserId
		})
		return user && user.role && user.role === "Admin";
    }
    
    onFinish = (event) => {
        const { tickets, bookingId } = this.state;
        if(!Object.keys(tickets).length) {
            message.warn("Please select number of tickets");
            return
        }
        const {train , currentUser} = this.props;
        const payload = {
            bookedBy: currentUser,
            from: train.from,
            to: train.to,
            bookedOn: +new Date(),
            id: bookingId,
            canceledTickets:[],
            tickets,
            train,
        }
        this.setState({ isLoading: true })
        fetch(APIURLS.booking.bookTickets, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
        .then((success)=>{
            console.log("success ", success);
            if(success.status === HTTP_RESPONSES.SUCCESS) {
                message.success("Tickets are created successfully");
                this.formRef.current.resetFields();
                this.handleCancel()
                this.setState({ isLoading: false })
            } else{
                this.setState({ isLoading: false })
                message.error("Tickets creation failed");
            }
        }, error => {
            this.setState({ isLoading: false })
            message.error("Tickets creation failed");
        })

    }

    handleCancel = () => {
        this.props.hideBookingForm();
        this.setState({ noOfTickets: 0, tickets:{}});
    }

    onNoOfTicketChange = (value) => {
        const tickets = {}
        for(let i=0; i<value; i++) {
            const id = guid();
            tickets[id] = {
                price: 0,
                index: i+1,
                id,
            }
        }
        this.setState({ tickets, bookingId: guid() });
    }

    updateTicket = (event, from, ticket) => {
        const { tickets } = this.state;
        const updateTicket = tickets[ticket.id];
        const { train } = this.props;
        if(from === "name") {
            updateTicket.name = event.target.value;
        } else if(from === "gender") {
            updateTicket.gender = event;
        } else if(from === "category") {
            updateTicket.category = event
        }
        if(updateTicket.category && updateTicket.gender) {
            updateTicket.price= train.price[updateTicket.category] * (train.discounts[updateTicket.gender]/100);
            updateTicket.price = train.price[updateTicket.category]-updateTicket.price;
            updateTicket.originalPrice = train.price[updateTicket.category];
            updateTicket.discount = train.discounts[updateTicket.gender]
        }
        tickets[ticket.id] = {...updateTicket};
        this.setState({ tickets });
    };



    render() {
        const { train } = this.props
        if(!train) {
            return null;
        }

        return(
            <Modal
                title={"Booking ticket for "+train.name}
                style={{ width: 400 }}
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                footer={null}
            >
            <Row>
                <Col span={24}>
                    <center>
                        <strong> Select No.Of Tickets:- </strong>
                        <Select
                            style={{ width: 240 }}
                            placeholder="No.Of Tickets"
                            onChange={this.onNoOfTicketChange}
                        >
                            {
                                [1,2,3,4,5,6,7,8,9,10].map(item => <Option key={item}>{item}</Option>)
                            }
                        </Select>
                    </center>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={21} >
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    key={this.state.bookingId}
                    >
                        <Spin spinning={this.state.isLoading}> 
                        {
                            Object.values(this.state.tickets).map((ticket) => {
                                return <TicketForm ticket={ticket} updateTicket={this.updateTicket} />
                                        
                            })
                        }
                        </Spin>
                        <br/><br/>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={3} />
            </Row>
        </Modal>
        );
    }
}

const TicketForm = ({ticket, updateTicket }) => {
    return (
    <>
        <Divider plain> Ticket {ticket.index}</Divider>
        <Form.Item
            label="Traveler Name"
            name={"ticket"+ticket.index+"_name"}
            rules={[
                {
                    required: true,
                    message: 'Please input name',
                },
            ]}
        >
            <Input 
                value={ticket.name} 
                onChange={ (event) => {updateTicket(event, 'name', ticket)} }
            />
        </Form.Item>
        

        <Form.Item
            label="Gender"
            name={"ticket"+ticket.index+"_gender"}
            rules={[
                {
                    required: true,
                    message: 'Please Select Gender',
                },
            ]}
        >
            <Select
                placeholder="Please Select Gender"
                onChange = {event => {updateTicket(event, 'gender', ticket)}}
                allowClear
                >
                {
                    GENDERS.map(gender => {
                        return <Option value={gender.key}>{gender.displayName}</Option>
                    })
                }
            </Select>
        </Form.Item>

        <Form.Item
            label="Age Catogory"
            name={"ticket"+ticket.index+"_category"}
            rules={[
                {
                    required: true,
                    message: 'Please Select Age Catogory',
                },
            ]}
        >
            <Select
                placeholder="Please Select Age Catogory"
                onChange = {event => {updateTicket(event, 'category', ticket)}}
                allowClear
                >
                {
                    PEOPLECATOGORIES.map(people => {
                        return <Option value={people.key}>{people.displayName}</Option>
                    })
                }
            </Select>
        </Form.Item>
        <center><strong> Final Price :- {"INR "+ticket.price+"/-"} </strong></center>
        {
            ticket.originalPrice ?
                <center>
                        <strong> 
                                Original Price :- {"INR "+ticket.originalPrice+"/-"} 
                                Discount Applied:-{ticket.discount+"%"} 
                        </strong>
                </center> : null
        }
        
    </>
    )
}

export default BookingForm;