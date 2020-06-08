import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import {v4 as guid} from 'uuid';
import { APIURLS, HTTP_STATUS } from '../constants';

export default class CreateCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities : [],
            confirmLoading: false,
            cityName: '',
        }
    };
    
    handleOk = () => {
        if(!this.state.cityName.length) {
            message.warning("Please fill mandatory fields")
            return
        }
        const payload = {
            name : this.state.cityName,
            id: guid()
        }
        this.setState({ confirmLoading: true });
        fetch(APIURLS.cities.createCity, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((success)=>{
            if(success.status === HTTP_STATUS.OK) {
                this.setState({
                    confirmLoading: false,
                    cityName: '',
                });
                message.success("City created successfullly");
                this.props.toggleShowCreateCityModel(false, true);
            } else {
                this.setState({
                    confirmLoading: false,
                });
                message.error("City creation failed");
            }
        }, error => {
            message.error("City creation failed");
        });
        console.log("click on ok");
      };
    
      handleCancel = () => {
        this.props.toggleShowCreateCityModel(false);
        console.log('Clicked cancel button');
      };
    
    render() {
        return(
        <Modal
            title="Create New City"
            visible={this.props.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            >
                <Input 
                    placeholder="Enter City Name"
                    value={this.state.cityName}
                    onChange={(event) => {
                        this.setState({ cityName: event.target.value })
                    }}
                />
        </Modal>
        )
    }
}