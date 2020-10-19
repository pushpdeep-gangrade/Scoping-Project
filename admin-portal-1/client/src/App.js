import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { Layout } from './components/Layout';
import { LoginContainer } from './containers/LoginContainer';
import { ProjectTeamsContainer } from './containers/ProjectTeamsContainer';
import { ExaminersContainer } from './containers/ExaminersContainer';
import { Profile } from './components/Profile';

import './custom.css'


export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }

        this.setUser = this.setUser.bind(this);
    }

  setUser(user) {
      this.setState({
         user: user
      })
  }

  render () {
    return (
        <Layout user={this.state.user} setUser={this.setUser}>
           <Route path='/login' render={(props) => <LoginContainer setUser={this.setUser}/>} />
           {this.state.user === null ? <Redirect to="/login"/> : <Route path='/profile' render={(props) => <Profile user={this.state.user}/>} />}
           {this.state.user === null ? <Redirect to="/login"/> : <Route path='/examiners' render={(props) => <ExaminersContainer user={this.state.user}/>} />}
           {this.state.user === null ? <Redirect to="/login"/> : <Route path='/project-teams' render={(props) => <ProjectTeamsContainer user={this.state.user}/>} />}
        </Layout>
    );
  }
}