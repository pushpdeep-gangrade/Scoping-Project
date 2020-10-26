import React, { Component } from 'react';
import { ProjectTeams } from '../components/ProjectTeams';
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');

export class ProjectTeamsContainer extends Component {
    static displayName = ProjectTeamsContainer.name;

    constructor(props) {
        super(props);

        console.log(this.props.cookies.get('authorizationToken'));

        this.state = {
            projectTeamsList: [],
            authToken: this.props.cookies.get('authorizationToken'),
            toggleForm: false,
            showQRCode: false,
            teamName: "",
            currentTeamQR: "",
            currentTeamIndvScores: null,
            showIndvScores: false
        };

        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCloseQRCode = this.handleCloseQRCode.bind(this);
        this.handleQRCodeClick = this.handleQRCodeClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this)
        this.populateProjectTeamsTable = this.populateProjectTeamsTable.bind(this);
        this.handleIndividualScoresClick = this.handleIndividualScoresClick.bind(this);
    }

    async componentDidMount(){
        await this.props.checkValidToken(this.state.authToken);

        this.populateProjectTeamsTable();
    }

    async populateProjectTeamsTable(){
        let projectTeamsList = [];


        let response = await fetch('/v1/teams', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AuthorizationKey': this.state.authToken
            },
        });

        const data = await response.json();

        console.log(data)

        for(let i = 0; i < data.length; i++){
            let team = data[i];
            console.log(team)
            let avg = 0;

            for(let j = 0; j < team.scores.length; j++){
                let score = team.scores[j]
                console.log(score)
                avg+=score.score
            }

            if(typeof team.scores !== 'undefined' && team.scores.length > 0){
                avg = avg / team.scores.length;
            }

            var nTeam = {
                _id: team._id,
                name: team.name,
                scores: team.scores,
                average: avg
            };

            projectTeamsList.push(nTeam)
        }

        this.setState({
            projectTeamsList: projectTeamsList
        })

    }

    async handleQRCodeClick(event, position){
        event.preventDefault();

        let generateTeam = this.state.projectTeamsList[position];

        var token = jwt.sign({
            u_id: generateTeam._id,
        }, 'secret', {
            expiresIn: 60 * 60
        });

        console.log(token.length);
 
        let urlData = "";

        await QRCode.toDataURL(token, {type: "png"}, function (err, url) {
            urlData = url
        });

        console.log(urlData);

        this.setState({
            qrcodeStr: urlData,
            showQRCode: true,
            currentTeamQR: generateTeam.name
        })

    }

    handleChange(event) {
        const value = event.target;

        if (value.name === "teamName") {
            this.setState({
                teamName: value.value
            })
        }
    }

    async handleSubmitClick(event) {
        event.preventDefault();

        let newTeam = { 
            teamname: this.state.teamName
        }

        let response = await fetch('/v1/teams', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AuthorizationKey': this.state.authToken
            },
            body: JSON.stringify(newTeam)
        });

        this.populateProjectTeamsTable();

    }

    handleCreateClick(event) {
        event.preventDefault();

        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    handleIndividualScoresClick(event, position){
        let generateTeam = this.state.projectTeamsList[position];

        console.log(generateTeam)

        this.setState({
            currentTeamIndvScores: generateTeam,
            showIndvScores: true
        })

    }

    handleCloseQRCode(){
        this.setState({
            showQRCode: false
        })
    }

  
    render() {
      
        return (
            <div>
                <ProjectTeams 
                    projectTeamsList={this.state.projectTeamsList} 
                    onSubmitClick={this.handleSubmitClick} 
                    onQRCodeClick={this.handleQRCodeClick} 
                    onCreateClick={this.handleCreateClick} 
                    onChange={this.handleChange}
                    onCloseQRClick={this.handleCloseQRCode}
                    currentTeamQR={this.state.currentTeamQR}
                    toggleForm={this.state.toggleForm}
                    showQRCode={this.state.showQRCode}
                    qrcodeStr={this.state.qrcodeStr}
                    showIndvScores={this.state.showIndvScores}
                    currentTeamIndvScores={this.state.currentTeamIndvScores}
                    onShowIndvScoresClick={this.handleIndividualScoresClick}
                />
            </div>
        );
    }
}
