import React from 'react';
import { Result, Button } from 'antd';

const EmptyResults = (props) => {
    return (
        <Result
            title={props.title}
        />
    )
}

export default EmptyResults;