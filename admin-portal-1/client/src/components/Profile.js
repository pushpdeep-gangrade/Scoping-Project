import React, { Component } from 'react';

export class Profile extends Component {
    static displayName = Profile.name;

    render() {
       

        return (
            <div>
                <h1>Home</h1><br/>
             {/*    <h3>First Name: {this.props.user.FirstName}</h3><br/>
                <h3>Last Name: {this.props.user.LastName}</h3><br/>
                <h3>Email: {this.props.user.Email}</h3><br /><br /> */}
            </div>
        );
    }
}
