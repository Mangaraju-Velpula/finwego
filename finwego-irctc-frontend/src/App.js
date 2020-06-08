import React from 'react';
import * as _ from 'lodash'
import { Layout } from 'antd';
import queryString from 'query-string';
import { Switch, Route } from 'react-router-dom';

import Sider from './commonComponents/Sider';
import Header from './commonComponents/Header';
import { withRouter } from 'react-router';
import { users } from './constants';
import TicketBookingContainer from './ticketBookingComponents/TicketBookingContainer';
import BookingHistoryContainer from './bookingHistoryComponents/BookingHistoryContainer';
import AddingTrainsContainer from './TrainManagementComponents/AddingTrainsContainer';

const { Content } = Layout;


class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			collapsed: false,
		  };
		
	}
	toggle = () => {
		this.setState({
		collapsed: !this.state.collapsed,
		});
	};

	pushToUser = (userId) => {
		this.props.history.push({
			pathname: '/home/ticket-booking/',
			search: '?userId='+userId
		});
	}

	changeUser = (event) => {
		this.pushToUser(event.target.value);
	}
	
	componentDidMount = () => {
		const queryStrings = queryString.parse(this.props.location.search);
		if(!queryStrings.userId) {
			this.pushToUser(users[0].id);
		}
	};

	changeRoute = ({ item, key, keyPath, domEvent }) => {
		this.props.history.push({
			pathname: '/home/'+key,
			search: this.props.location.search,
		});
		console.log("item is ", item, key, keyPath);
	}

	isCurrentUserAdmin = (currentUserId) => {
		// if()
		const user = _.find(users, (user) => {
			return user.id === currentUserId
		})
		return user && user.role && user.role === "Admin";
	}

	render() {
		const queryStrings = queryString.parse(this.props.location.search);
		return (
		<Layout style={{ backgroundColor: '#f9f9f9', height: '100%' }}>
			<Sider
				collapsed={this.state.collapsed}
				changeRoute ={ this.changeRoute }
				pathname = {this.props.location.pathname}
				isAdmin = {this.isCurrentUserAdmin(queryStrings.userId)}
			/>
			<Layout className="site-layout">
				<Header 
					collapsed={this.state.collapsed} 
					toggle={this.toggle}
					currentUser = {queryStrings.userId}
					changeUser={this.changeUser}

				/>
					<Content
					className="site-layout-background"
					style={{
					margin: '24px 16px',
					padding: 24,
					minHeight: 280,
					}}
					>
						<Switch>
							<Route path='/home/ticket-booking' component={TicketBookingContainer} />
							<Route path='/home/booking-histrory' component={BookingHistoryContainer} />
							<Route path='/home/add-new-train' component={AddingTrainsContainer} />
						</Switch>		
					</Content>
			</Layout>
		</Layout>
		);
	}
}

export default withRouter(App);