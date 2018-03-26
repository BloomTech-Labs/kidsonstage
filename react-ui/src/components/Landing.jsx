import React, { Component } from 'react';
import { Link } from 'react-router'

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        this.setState({
            text: props.text
        })
    }
    render() {
        return (
            <div>
                <button className='left'>sign in</button><button classnam='left'>sign up</button>
            </div>
        )
    }
}