
import React from 'react';
import {Layout, Divider, Spin} from 'antd';
import * as _ from 'lodash';
import { withRouter } from 'react-router';
import queryString from 'query-string'
import TravelLocationsSelection from './TravelLocationsSelection';
import { APIURLS, HTTP_RESPONSES, users } from '../constants'
import TrainsList from './TrainsList';
import BookingForm from './BookingForm';
import TrainDetails from '../commonComponents/TrainDetails';
import EmptyResult from '../commonComponents/EmptyResults';

const { Header, Content} = Layout;

class TicketBookingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trains : [],
            showBookingForm: false,
            train: null,
            showTrainDetails: false,
            isLoading: false,
        }
    }

    getTrainsBetweenCities = (from, to) => {
        this.setState({ isLoading: true})
        const payload = {from, to}
        fetch(APIURLS.trains.getTrainsBetweenCities, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(suc => suc.json())
        .then((success)=>{
            this.setState({ isLoading: false });
            if(success.status === HTTP_RESPONSES.SUCCESS) {
                this.setState({ trains: success.response });
            }
        }, error => {
            this.setState({ isLoading: false });
            console.error("error is ", error);
        })
    }

    onBookTicketClick = (train) => {
        this.setState({ showBookingForm: true, train: train });
    }

    hideBookingForm = () => {
        this.setState({ showBookingForm: false, train: null });
    }

    onTrainDetails = (train) => {
        this.setState({ showTrainDetails : true, train})
    }

    hideTrainDetails = () => {
        this.setState({ showTrainDetails : false, train: null})
    }

    currentUser = (currentUserId) => {
		const user = _.find(users, (user) => {
			return user.id === currentUserId
		})
		return user;
	}

    render() {
        console.log("props ", this.props);
        const queryStrings = queryString.parse(this.props.location.search);
        return(
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <TravelLocationsSelection 
                    getTrainsBetweenCities = {this.getTrainsBetweenCities}
                />
			</Header>
			<Divider plain style={{margin : 0}} />
			<Content
				className="site-layout-background"
			>	<br />
                <Spin spinning={this.state.isLoading}>
                    {
                        this.state.trains.length ? 
                        <TrainsList 
                            trains = {this.state.trains}
                            onBookTicketClick={this.onBookTicketClick}
                            onTrainDetails={this.onTrainDetails}
                        /> : <EmptyResult title="Seems no trains available. Please try changing filters"/>
                    }
                </Spin>
			</Content>
            <BookingForm 
                visible = {this.state.showBookingForm}
                train = {this.state.train}
                hideBookingForm={this.hideBookingForm}
                currentUser = {this.currentUser(queryStrings.userId)}
            />
            <TrainDetails 
                visible = {this.state.showTrainDetails}
                handleCancel={this.hideTrainDetails}
                train ={this.state.train}
            />
        </Layout>
        )
    }
}
export default withRouter(TicketBookingContainer);