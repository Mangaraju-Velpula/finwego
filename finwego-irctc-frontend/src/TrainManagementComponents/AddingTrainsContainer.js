
import React from 'react';
import { Layout, Divider, message, Spin } from 'antd';

import CreateCity from './CreateCity';
import NewTrainForm from './NewTrainForm';
import EditTrainForm from './EditTrain';
import TrainManagementHeader from './TrainManagementHeader';
import Trains from "./Trains";
import { APIURLS, HTTP_RESPONSES } from '../constants';
import TrainDetails from '../commonComponents/TrainDetails';

const { Header, Footer, Content } = Layout;



class AddingTrainsContainer extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			showCreateCity : false,
			fetchTrains: false,
			showCreateTrain: false,
			trains: [],
			showEditTrain: false,
			editTrain: {},
			showTrainDetails: false,
			train:null,
			isLoading: false,
		}
	};

	componentDidMount() {
		this.fetchTrains();
	}
	
	toggleShowCreateCityModel = (status) => {
		this.setState({showCreateCity: status})
	}

	toggleShowCreateTrainModel = (status, isCreated = false) => {
		if(isCreated) {
			this.setState({
				showCreateTrain: status,
			});
			setTimeout(() => {
				this.fetchTrains();
			}, 2000)
		} else {
			this.setState({showCreateTrain: status})
		}
	}

	toggleShowEditTrainModel = (status, isEdited = false) => {
		if(isEdited) {
			this.setState({
				showEditTrain: status,
			});
			setTimeout(() => {
				this.fetchTrains();
			}, 2000)
		} else {
			this.setState({showEditTrain: status})
		}
	}

	onDeleteTrain = (train) => {
		this.setState({ isLoading : true });
		const url = APIURLS.trains.deleteTrain.replace('{id}', train.id);
		fetch(url, {
			method: 'delete',
		}).then(res => res.json())
		.then((success) => {
			this.setState({ isLoading : false });
			if(success.status === HTTP_RESPONSES.SUCCESS) {
				message.success("Train deleted Successfully");
				setTimeout(() => {
					this.fetchTrains();
				}, 2000);
			} else {
				message.error("Train deletion failed");
			}
		}, (error) => {
			this.setState({ isLoading : false });
			message.error("Train deletion failed");
		})
	}

	onEditTrain = (train) => {
		this.setState({ editTrain: train , showEditTrain: true});
	} 

	fetchTrains = () => {
		this.setState({ isLoading : true });
		fetch(APIURLS.trains.getAllTrains)
		.then(res => res.json())
		.then(
			(success) => {
				this.setState({ isLoading : false });
				if(success.status === HTTP_RESPONSES.SUCCESS) {
					this.setState({ trains : success.response });
				}
			}, error => {
				this.setState({ isLoading : false });
				console.error("error response ", error);
			}
		)
	}

    onTrainDetails = (train) => {
        this.setState({ showTrainDetails : true, train})
	}
	
	hideTrainDetails = () => {
        this.setState({ showTrainDetails : false, train: null})
    }

    render() {
        return(
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
				<TrainManagementHeader 
					toggleShowCreateCityModel={this.toggleShowCreateCityModel}
					toggleShowCreateTrainModel={this.toggleShowCreateTrainModel}
				/>
			</Header>
			<Divider plain style={{margin : 0}} />
			<Content
				className="site-layout-background"
			>	<br />
				<Spin spinning={this.state.isLoading}>
					<Trains 
						trains = {this.state.trains} 
						onDelete = {this.onDeleteTrain}
						onEdit= {this.onEditTrain}
						onTrainDetails={this.onTrainDetails}
					/>
				</Spin>
			</Content>
			<CreateCity
				visible = {this.state.showCreateCity}
				toggleShowCreateCityModel = {this.toggleShowCreateCityModel}
			/>
			<NewTrainForm 
				visible = {this.state.showCreateTrain}
				toggleShowCreateTrainModel={this.toggleShowCreateTrainModel}
			/>
			<EditTrainForm 
				visible = {this.state.showEditTrain}
				toggleShowEditTrainModel = {this.toggleShowEditTrainModel}
				train = {this.state.editTrain}
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

export default AddingTrainsContainer;