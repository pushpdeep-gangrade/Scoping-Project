import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import { Login } from '../components/Login';


export class LoginContainer extends Component {
    static displayName = LoginContainer.name;

    constructor(props) {
        super(props);

        this.state = {
            successfulLogin: false,
            user: {
                FirstName: "John",
                LastName: "Smith",
                Email: "jsmith@email.com"
              },
            email: "",
            password: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const value = event.target;

        if (value.name === "email") {
            this.setState({
                email: value.value,
            })
        }
        else if (value.name === "password") {
            this.setState({
                password: value.value,
            })
        }
    }

    handleClick(event) {
        event.preventDefault();
        //Will eventually pull user from the database
        this.props.setUser(this.state.user);
        this.setState({ successfulLogin: true });
    }

  
    render() {
      
        return (
            <div>
                {this.state.successfulLogin === true ? false : <Login onClick={this.handleClick} onChange={this.handleChange} />}
                {this.state.successfulLogin === false ? true : <Redirect
                to={{
                    pathname: "/profile",
                    state: { user: this.state.user }
                }}/>}
            </div>
        );
    }
}

export default withRouter(LoginContainer);
