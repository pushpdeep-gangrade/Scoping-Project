import React, { Component } from 'react';
import { ProjectTeams } from '../components/ProjectTeams';


export class ProjectTeamsContainer extends Component {
    static displayName = ProjectTeamsContainer.name;

    constructor(props) {
        super(props);

        this.state = {
            projectTeamsList: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.populateProjectTeamsTable = this.populateProjectTeamsTable.bind(this);

    }

    componentDidMount(){
        this.populateProjectTeamsTable();
    }

    populateProjectTeamsTable(){
        //Will eventually pull project teams from the database
        let projectTeamsList = [
            {
                TeamName: "Team 1",
                AverageScore: 85,
            },
            {
                TeamName: "Team 2",
                AverageScore: 70,
            },
            {
                TeamName: "Team 3",
                AverageScore: 90
            },
        ]

        this.setState({
            projectTeamsList: projectTeamsList
        })

    }

    handleChange(event) {
        const value = event.target;
    }

    handleClick(event) {
        event.preventDefault();
    }

  
    render() {
      
        return (
            <div>
                <ProjectTeams projectTeamsList={this.state.projectTeamsList} onClick={this.handleClick} onChange={this.handleChange} />
            </div>
        );
    }
}
