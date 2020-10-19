import React, { Component } from 'react';
import { Form, Button, Table } from 'reactstrap';

export class ProjectTeams extends Component {
    static displayName = ProjectTeams.name;

    render() {
        let items = [];

        for (const [index, value] of this.props.projectTeamsList.entries()) {
            items.push(<tr id={value.Email}>
                    <td headers="rowNum">{index+1}</td>
                    <td headers="teamName">{value.TeamName}</td>
                    <td headers="avgScore">{value.AverageScore}</td>
                    <td headers="indvScoresBtn"><Button>View Individual Scores</Button></td>
                    <td headers="viewMembersBtn"><Button>View Members</Button></td>
                </tr>
             )
        }

        return (
            <div>
                <h1>Project Teams</h1><br/>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Team Name</th>
                        <th>Average Score</th>
                        <th>Individual Scores</th>
                        <th>Members</th>
                        </tr>
                    </thead>
                    <tbody>
                       {items}
                    </tbody>
                </Table>
                <Button onClick={this.props.handleClick}>Create Project Team</Button>
            </div>
        );
    }
}