
import React from 'react';
import * as _ from 'lodash';
import { Collapse, Spin, Row, Col, Divider, Table, Button, message } from 'antd';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { APIURLS, HTTP_RESPONSES, users } from '../constants'
import EmptyResults  from '../commonComponents/EmptyResults';
const { Panel } = Collapse;

const { Column  } = Table;

class BookingHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            isLoading: false,
        }
    }

    
    componentDidMount() {
        const queryStrings = queryString.parse(this.props.location.search);
        this.fetchBookings(queryStrings.userId);
    }

    componentWillReceiveProps(nextProps) {
        const queryStrings = queryString.parse(this.props.location.search);
        const nextStrings = queryString.parse(nextProps.location.search);
        if(queryStrings.userId !== nextStrings.userId) {
            this.fetchBookings(nextStrings.userId);
        }
    }

    fetchBookings = (userId) => {
        this.setState({ isLoading: true })
        const url = APIURLS.booking.fetchUserBookings.replace('{userId}',userId);
        fetch(url).then(res=>res.json())
        .then((success)=>{
			if(success.status === HTTP_RESPONSES.SUCCESS) {
                setTimeout(()=>{
                    this.setState({ bookings : success.response, isLoading: false });
                }, 2000)
			} else {
                console.error(success);
                this.setState({ isLoading: false })
			}
        }, (error) => {
            this.setState({ isLoading: false })
            console.error(error);
        })
    }

    onCancel = (booking, ticket) => {
        console.log("onCacel ", booking, ticket);
        this.setState({ isLoading: true});
        const payload = {
            bookingId: booking.id,
            ticketId: ticket.id
        };
        console.log("payload is ", payload);
        fetch(APIURLS.booking.cancelTicket, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res=>res.json())
        .then((success) => {
            if(success.status === HTTP_RESPONSES.SUCCESS) {
                message.success("Ticket cancelled successfully")
                setTimeout(()=>{
                    // this.setState({ isLoading: false});
                    const queryStrings = queryString.parse(this.props.location.search);
                    this.fetchBookings(queryStrings.userId);
                }, 2000);
                // this.fetchBookings();
            } else {
                message.error("Ticket cancellation failed")
            }
        }, error => {
            this.setState({ isLoading: false});
            message.error("Ticket cancellation failed")
        })
    }

    render() {
        if(!this.state.isLoading && !this.state.bookings.length) {
            return <EmptyResults title="Seems you haven't booked tickets yet!"/>;
        }
        return(
        <Spin spinning={this.state.isLoading} tip="Looking for booking histroy...">
            <Collapse accordion>
				{
					this.state.bookings.map((booking) => {
                        return  <Panel 
                                    header={<BookingHeader booking={booking} />} 
                                    key={booking.id}
                                >
                                    {
                                        <Tickets 
                                            booking={booking} 
                                            tickets={booking.tickets}
                                            onCancel={this.onCancel} 
                                        />
                                    }
						</Panel>
					})
				}
            </Collapse>
        </Spin>
        )
    }
}
export default withRouter(BookingHistoryContainer);


const BookingHeader = ({ booking }) => {
    console.log("tickets are ", booking);
    return(
    <strong>
        <Row>
            <Col span={6}>
                <em>Train Name:-</em> {booking.train.name}
            </Col>
            <Col span={1}>
                <Divider type="vertical" />
            </Col>
            <Col span={6}>
                <em>Travel:-</em> {booking.from.name} --> {booking.to.name}
            </Col>
            <Col span={1}>
                <Divider type="vertical" />
            </Col>
            <Col span={6}>
                <em>Tickets:-</em> { Object.keys(booking.tickets).length}
            </Col>
            <Col span={4}>

            </Col>
        </Row>
    </strong>
    )
}

const Tickets = (props) => {
    const tickets = Object.values(props.tickets);
    return (
        <Table dataSource={tickets}>
            <Column
                title="S.No" 
                dataIndex="index" 
                key="index" 
            /> 
            <Column
                title="Traveler" 
                dataIndex="" 
                key="name" 
                render = {(props) => {
                    console.log("props here ", props); 
                    return props.name+" ("+_.capitalize(props.gender)+","+_.capitalize(props.category)+")";
                }} 
            />
            <Column
                title="Price" 
                dataIndex="" 
                key="price"
                render = {(props) => {
                    return "INR "+props.price+"/-"
                }} 
            />
            <Column
                title="Original Price" 
                dataIndex="" 
                key="originalPrce" 
                render = {(props) => {
                    return "INR "+props.originalPrice+"/-"
                }} 
            /> 
            <Column
                title="Applied Discout" 
                dataIndex="" 
                key="discount" 
                render = {(props) => {
                    return props.discount+"%";
                }} 
            />
            <Column
                title="Actions" 
                dataIndex="" 
                key="cancel" 
                render = {(ticketProps) => {
                    const isCancelled = props.booking.canceledTickets.includes(ticketProps.id);
                    if(isCancelled) {
                        return <Button 
                                    type="primary" danger disabled>
                                        Ticket Cancelled
                                </Button>;
                    }
                    return <Button 
                                onClick={()=> props.onCancel(props.booking, ticketProps)}
                                type="primary" danger>
                                    Cancel Ticket
                            </Button>;
                }} 
            />
        </Table>
    )
}