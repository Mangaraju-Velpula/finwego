import React from 'react';
import * as _ from 'lodash';
import { Select, Row, Col, Button, message } from 'antd';
import {
	SearchOutlined
  } from '@ant-design/icons';
import { APIURLS, HTTP_RESPONSES } from '../constants';
const { Option } = Select;

export default class TravelLocationsSelection extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoading : false,
			cities : [],
			selectedCities: {},
			from: null,
			to: null,
		}
	}
	componentDidMount() {
		this.fetchCities();
	}

	fetchCities = () => {
		console.log("apis call path ", APIURLS.cities.getCities);
		fetch(APIURLS.cities.getCities)
		.then(result => result.json())
		.then((success)=>{
			if(HTTP_RESPONSES.SUCCESS === success.status) {
				this.setState({
					cities: success.response
				});
			} else {
				console.log("field is herer ", success)
			}
		}, (error)=> {
			console.log("errrorrr ", error);
		})
	}

	onChangeOfLeavingFrom = (event) => {
		this.setState({ from : event });
	}

	onChangeOfGoingTo = (event) => {
		this.setState({ to : event });
	}

	getCity = (cityId) => {
		return _.find(this.state.cities, (city) => city.id === cityId)
	 }

	onSearch = () => {
		if(!this.state.from) {
			message.warn("Please select city leaving from")
		} else if(!this.state.to) {
			message.warn("Please select city going to");
		} else {
			this.props.getTrainsBetweenCities(this.getCity(this.state.from), this.getCity(this.state.to));
		}

	};

    render() {
		console.log("from and to ", this.state.from, this.state.to);
        return(
		<Row>
			<Col span={8}>
				<center>
					<strong><em>Leaving From: &nbsp;&nbsp; </em></strong>
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="Leaving from"
						optionFilterProp="children"
						onChange={this.onChangeOfLeavingFrom}
						onSearch={this.onSearch}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						>
							{
								this.state.cities.map(city => {
									if(!this.state.to || this.state.to !== city.id ) {
										return <Option value={city.id}>{city.name}</Option>
									}
									return null;
								})
							}
					</Select>
				</center>
			</Col>
			<Col span={8}>
				<center>
					<strong><em>Going to: &nbsp;&nbsp; </em></strong>
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="Going to"
						optionFilterProp="children"
						onChange={this.onChangeOfGoingTo}
						onSearch={this.onSearch}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						>
						{
							this.state.cities.map(city => {
								if(!this.state.from || this.state.from != city.id ) {
									return <Option value={city.id}>{city.name}</Option>
								}
								return null;
							})
						}
					</Select>
				</center>
			</Col>
			<Col span={8}>
				<Button 
					type="primary" 
					icon={<SearchOutlined />} 
					onClick={this.onSearch}
					size="large" > 
						Search&nbsp;&nbsp; 
				</Button>
			</Col>
		</Row>
        )
    }
}