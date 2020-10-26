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
            token: this.props.cookies.get('authorizationToken')

        }

        this.setUser = this.setUser.bind(this);
        this.checkValidToken = this.checkValidToken.bind(this);
    }

    async componentDidMount(){
      let token = this.props.cookies.get('authorizationToken')
      await this.checkValidToken(token)
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
  async checkValidToken(token){
    let response = await fetch('/v1/token/check', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AuthorizationKey': token
      },
    });

    const data = await response.text();
    console.log(data);

    if(data === "Token is valid"){

    }
    else{
      this.setUser(null,null)
    }
   
  }

  render () {
    console.log(this.props.cookies.get('authorizationToken'));
    let token = this.props.cookies.get('authorizationToken')

    return (
        <Layout user={this.state.user} setUser={this.setUser} cookies={this.props.cookies}>
           {token !== undefined ? <Redirect to="/home"/> : <Route path='/login' render={(props) => <LoginContainer setUser={this.setUser}/>} />}
           <Route path='/home' render={(props) => <Profile user={this.state.user}/>}/>

           {/* {token === undefined ? <Redirect to="/login"/> : <Route path='/profile' render={(props) => <Profile user={this.state.user}/>} cookies={this.props.cookies}/>} */}
           {token === undefined ? <Redirect to="/login"/> : <Route path='/examiners' render={(props) => <ExaminersContainer user={this.state.user} cookies={this.props.cookies} checkValidToken={this.checkValidToken}/>} />}
           {token === undefined ? <Redirect to="/login"/> : <Route path='/project-teams' render={(props) => <ProjectTeamsContainer user={this.state.user} cookies={this.props.cookies} checkValidToken={this.checkValidToken}/>} />}
         </Layout>
    );
  }
}

export default withCookies(App);
