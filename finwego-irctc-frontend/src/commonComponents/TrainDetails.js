import React from 'react';
import { Modal, Row, Col, Divider } from 'antd';
import { GENDERS, PEOPLECATOGORIES} from '../constants';

const TrainDetails = ({ train , handleCancel, visible}) => {
    if(!train) {
        return null;
    }
    return(
        <Modal
            title={train.name}
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <Row>
                    <Col span={12}>
                        <center><strong>Train Name</strong> </center> 
                    </Col>
                    <Col span={12}>
                        <strong>{train.name}</strong>
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                        <center><strong>Train Number</strong> </center> 
                    </Col>
                    <Col span={12}>
                        <strong>{train.number}</strong>
                    </Col>
            </Row>
            <Divider plain><strong>Travel</strong></Divider>
            <Row>
                <Col span={12}>
                    <center><strong>Starting From</strong> </center> 
                </Col>
                <Col span={12}>
                    <strong>{train.from.name}</strong>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <center><strong>Going to</strong> </center> 
                </Col>
                <Col span={12}>
                    <strong>{train.to.name}</strong>
                </Col>
            </Row>
            <Divider plain><strong>Pricing Model</strong></Divider>
            {
                PEOPLECATOGORIES.map((category)=>{
                    console.log("asdfasdf ", train.price, train.price[category.key]);
                    return (
                        <Row>
                            <Col span={12}>
                                <center><strong>{category.displayName}</strong> </center> 
                            </Col>
                            <Col span={12}>
                                <strong>{"INR "+train.price[category.key]+"/-"}</strong>
                            </Col>
                    </Row>
                    )
                }) 
            }
            <Divider plain><strong>Discounts</strong></Divider>
            {
                GENDERS.map((gender)=>{
                    return (
                        <Row>
                            <Col span={12}>
                                <center><strong>{gender.displayName}</strong> </center> 
                            </Col>
                            <Col span={12}>
                                <strong>{train.discounts[gender.key]+"%"}</strong>
                            </Col>
                    </Row>
                    )
                }) 
            }
        </Modal>
    )
}
export default TrainDetails;