import React from 'react';
import { PageHeader, Button, Descriptions } from 'antd';


const TrainManagementHeader = (props) => {
	return (
		<PageHeader
			ghost={false}
			title="Trains Management"
			subTitle="Add, Delete, Update Trains and Pricing"
			extra={[
				<Button 
					key="3"
					onClick={props.toggleShowCreateTrainModel}
				>
					Create Train
				</Button>,
				<Button key="2" 
					onClick={props.toggleShowCreateCityModel}
				>
					Create City
				</Button>,
			]}
			/>
	);
}
 export default TrainManagementHeader;