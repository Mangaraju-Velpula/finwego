import React from 'react';
 

export default class Other extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag : true,
        }
    }
    changeState = () => {
        this.setState({flag : !this.state.flag});
    }
    render() {
        return (
        <>
            <h1> {`Current flag of Other is ${String(this.state.flag)} `} </h1>
            <button onClick={this.changeState}> Click Me {String(this.state.flag)} </button>
            <Child1 flag={this.state.flag}/>
        </>
        );
    }
}

class Child1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            child1 : true,
            friends : [],
        }
    }
    changeState = () => {
        this.setState({child1 : !this.state.child1});
    }
    render() {
        return (
            <>
                <h1>{`Parent flag is ${String(this.props.flag)}`} </h1>
                <h1> {`Current flag of child1 is ${String(this.state.child1)} `} </h1>
                <button onClick={this.changeState}> STOP RE-RENDER for parent flag </button>
                <Child2 child1={this.state} />
            </>
        );
    }
}

class Child2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            child2  : {
                child2 : {
                    child2 : false,
                },
            },
        }
    }
    changeState = () => {
        // this.state.child2.child2 = !this.state.child2.child2;
        // this.setState({child2 : {child2['child2'] : { child2 : !this.state.child2.child2} } });
    }
    render() {
        console.log("render in other child2");
        return (
            <>
                <h1>{`Parent flag is ${String(this.props.flag)}`} </h1>
                <h1> {`Current flag of child1 is ${String(this.props.child1)} `} </h1>
                <h1> {`Current flag of child2 is ${String(this.state.child2.child2)} `} </h1>
                <button onClick={this.changeState}> STOP RE-RENDER for child1 flag </button>
            </>
        );
    }
}