import React from 'react';
import { v4 as guid} from 'uuid';
import * as _ from 'lodash';
import {Row, Col, Modal, Form, Input, Button, Select, Divider, InputNumber, message, Spin } from 'antd';
import { APIURLS, HTTP_RESPONSES } from '../constants'

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

export default class NewTrainForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cities : [],
            from: null,
            to: null,
            isLoading: false,
        }
        this.formRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.visible !== nextProps.visible && nextProps.visible) {
            this.fetchCities();
            console.log()
        }
    }

    componentDidMount() {
        console.log("NEWTRAINMODEL ", this.formRef);
    }

    fetchCities = () => {
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

    getCity = (cityId) => {
       return _.find(this.state.cities, (city) => city.id === cityId)
    }

    onFinish = (event) => {
        const payload = {
            name: event.name,
            number: event.number,
            id: guid(),
            from: this.getCity(event.from),
            to: this.getCity(event.to),
            discounts: {
                male: event.discount_male,
                female: event.discount_female,
                other: event.discount_other
            },
            price: {
                adult: event.price_adult,
                kid: event.price_kid,
                senior: event.price_senior
            }
        }
        this.setState({ isLoading: true });
        fetch(APIURLS.trains.createTrain, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
        .then((success)=>{
            console.log("success ", success);
            this.setState({ isLoading: false });
            if(HTTP_RESPONSES.SUCCESS === success.status) {
				this.setState({
                    from: null,
                    to: null,
                });
                message.success("Train Created Successfully");
                this.props.toggleShowCreateTrainModel(false, true);
                this.formRef.current.resetFields();
			} else {
                this.setState({ isLoading: false });
                message.error("Train creation failed")
			}
        }, error => {
            this.setState({ isLoading: false });
            console.log("error ", error);
            message.error("Train creation failed")
        })
    }

    handleCancel = () => {
        this.props.toggleShowCreateTrainModel(false);
    }

    render() {
        return (
        <Modal
            title="Create New Train"
            visible={this.props.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            footer={null}
            >
        <Spin spinning={this.state.isLoading}>
            <Row>
                <Col span={21} >
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="Train Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input train name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Train No."
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input train number',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item
                            label="Starting point"
                            name="from"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Starting point',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Please Select Starting point"
                                onChange={(value)=> {
                                    this.setState({ from : value })
                                }}
                                allowClear
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
                        </Form.Item>



                        <Form.Item
                            label="Destination"
                            name="to"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Destination point',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Please Select Destination point"
                                onChange={(value)=> {
                                    this.setState({ to : value })
                                }}
                                allowClear
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
                        </Form.Item>
                        

                        <Divider plan> Prices </Divider>

                        <Form.Item
                            label="Kids"
                            name="price_kid"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Price for kids',
                                },
                            ]}
                        >
                           <InputNumber 
                                defaultValue={1}
                                min={1} 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Adults"
                            name="price_adult"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Price for Adults',
                                },
                            ]}
                        >
                           <InputNumber 
                                defaultValue={1}
                                min={1} 
                            />
                        </Form.Item>

                        <Form.Item
                            label="Senior citizen"
                            name="price_senior"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Price for Senior Citizen',
                                },
                            ]}
                        >
                           <InputNumber 
                                defaultValue={1}
                                min={1} 
                            />
                        </Form.Item>


                        <Divider plan> Discounts (%)</Divider>

                        <Form.Item
                            label="Discount for Male"
                            name="discount_male"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Discount for Adult Male',
                                },
                            ]}
                        >
                           <InputNumber 
                                defaultValue={1}
                                formatter={value => `${value}%`}
                                min={1} 
                                max={100}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Discount for Female"
                            name="discount_female"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Discount for Female',
                                },
                            ]}
                        >
                           <InputNumber 
                                defaultValue={1}
                                formatter={value => `${value}%`}
                                min={1} 
                                max={100}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Discount for Others"
                            name="discount_other"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Discount for Others',
                                },
                            ]}
                        >
                           <InputNumber 
                                defaultValue={1}
                                formatter={value => `${value}%`}
                                min={1} 
                                max={100}
                            />
                        </Form.Item>




                        


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={3} />
            </Row>
            </Spin>
        </Modal>
        )
    }
}