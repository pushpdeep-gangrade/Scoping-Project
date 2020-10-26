import React, { Component, useState } from 'react';
import { Alert, Form, Button, Table, FormGroup, Label, Input, Card, CardBody, CardTitle, CardImg, CardText, Dropdown} from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class ProjectTeams extends Component {
    static displayName = ProjectTeams.name;
    

    render() {
        //const [visible, setVisible] = useState(true);
        
        let items = [];
        let items2 = []

       

        let teamsForm = (<div><Form><br/>
            <h2>Create Team</h2>
            <FormGroup>
                <Label for="first">Team Name</Label>
                <Input type="text" name="teamName" id="teamName" placeholder="Team Name" onChange={this.props.onChange}/>
            </FormGroup>
            <Button onClick={this.props.onSubmitClick}>Submit</Button>
        <br/></Form><br/></div>);

        let qrCard = (<div>
            <Card style={{width: "350px"}}>
        <CardBody>
        <CardTitle style={{textAlign: "right"}}><Button outline onClick={this.props.onCloseQRClick}>X</Button></CardTitle>
          <CardTitle>Generated QR Code</CardTitle>
        </CardBody>
        <div style={{textAlign: "center"}}><img width="300px" src={this.props.qrcodeStr}/></div>
        <CardBody>
          <CardText>{this.props.currentTeamQR}</CardText>
        </CardBody>
      </Card><br/></div>
        )


        for (const [index, value] of this.props.projectTeamsList.entries()) {
            let dropDownOptions = (
                <UncontrolledDropdown>
                <DropdownToggle caret>
                  Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(event) => this.props.onQRCodeClick(event,index)}>Generate QR Code</DropdownItem>
                  <DropdownItem onClick={(event) => this.props.onShowIndvScoresClick(event,index)}>View Individual Scores</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
               )

            items.push(<tr id={value.name}>
                    <td headers="rowNum">{index+1}</td>
                    <td headers="teamName">{value.name}</td>
                    <td headers="avgScore">{value.average}</td>
                   {/*  <td headers="indvScoresBtn"><Button onClick={(event) => this.props.onShowIndvScoresClick(event,index)}>View Individual Scores</Button></td>
                    <td headers="qrCodeBtn"><Button onClick={(event) => this.props.onQRCodeClick(event,index)}>Generate QR Code</Button></td>
                     */}<td headers="dropDown">{dropDownOptions}</td>
                </tr>
             )
        }

        if(this.props.currentTeamIndvScores !== null){
            for (const [index, value] of this.props.currentTeamIndvScores.scores.entries()) {
                items2.push(<tr id={this.props.currentTeamIndvScores.name}>
                        <td headers="rowNum">{index+1}</td>
                        <td headers="teamName">{value.examinerName}</td>
                        <td headers="score">{value.score}</td>
                    </tr>
                 )
            }
        }

        let indvScoresTable;

        if(this.props.currentTeamIndvScores !== null){
            indvScoresTable = (
                <div>
                    <br/>
                    <h2>{this.props.currentTeamIndvScores.name} Scores</h2><br/>
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Examiner Name</th>
                            <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                           {items2}
                        </tbody>
                    </Table><br/>
                </div>
            )
        }
       
        

        return (
            <div>
                <h1>Project Teams</h1><br/>
                {this.props.showQRCode === false ? true : <div style={{textAlign: "center", marginLeft: "290px"}}>{qrCard}</div>}
                <div><Button onClick={this.props.onCreateClick}>Create Project Team</Button></div>
                {this.props.toggleForm === false ? true : teamsForm}
                <br/>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Team Name</th>
                        <th>Average Score</th>
                        <th>Choose Options</th>
                        </tr>
                    </thead>
                    <tbody>
                       {items}
                    </tbody>
                </Table>
                {this.props.showIndvScores === false ? true : indvScoresTable}
            </div>
        );
    }
}