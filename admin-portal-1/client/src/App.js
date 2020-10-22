import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { Layout } from './components/Layout';
import { LoginContainer } from './containers/LoginContainer';
import { ProjectTeamsContainer } from './containers/ProjectTeamsContainer';
import { ExaminersContainer } from './containers/ExaminersContainer';
import { Profile } from './components/Profile';
import { withCookies } from 'react-cookie';

import './custom.css'

class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }

        this.setUser = this.setUser.bind(this);
    }

  setUser(user, token) {
    if(token === null){
        this.props.cookies.remove('authorizationToken')
    }
    else{
        this.props.cookies.set('authorizationToken', token, { path: '/' })
    }
      this.setState({
         user: user
      })
  }

  //Implement later 
  checkValidToken(token){

  }

  render () {
    const token = this.props.cookies.get('authorizationToken');
    console.log(this.props.cookies.get('authorizationToken'));

    return (
        <Layout user={this.state.user} setUser={this.setUser} cookies={this.props.cookies}>
           {token !== undefined ? <Redirect to="/profile"/> : <Route path='/login' render={(props) => <LoginContainer setUser={this.setUser}/>} />}
           {token === undefined ? <Redirect to="/login"/> : <Route path='/profile' render={(props) => <Profile user={this.state.user}/>} cookies={this.props.cookies}/>}
           {token === undefined ? <Redirect to="/login"/> : <Route path='/examiners' render={(props) => <ExaminersContainer user={this.state.user} cookies={this.props.cookies}/>} />}
           {token === undefined ? <Redirect to="/login"/> : <Route path='/project-teams' render={(props) => <ProjectTeamsContainer user={this.state.user} cookies={this.props.cookies}/>} />}
        </Layout>
    );
  }
}

export default withCookies(App);
