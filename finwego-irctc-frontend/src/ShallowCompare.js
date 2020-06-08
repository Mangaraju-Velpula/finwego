import React from 'react';

export default class ShallowCompare extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            friends : ["Hello", "Hai"],
        }
        this.friends = this.state.friends;
    }
    changeState = () => {
        const friends = this.state.friends;
        friends.push("Added");
        this.setState({friends}); //////////////////FAILED TO RERENDER WHEN REFERENCES ARE SHARED;
    }
    render() {
        return <>
            { this.state.friends.map((friend)=><li> {friend} </li>) }
            <button onClick={this.changeState}> changeState </button>
        </>
        return 
    }
}