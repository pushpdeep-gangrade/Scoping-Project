import React, { Component } from 'react';
import { Form, Button, Table, FormGroup, Label, Input} from 'reactstrap';

export class Examiners extends Component {
    static displayName = Examiners.name;

    render() {
        let items = [];

        let examinersForm = (<Form><br/><br/>
            <h2>Create Examiner</h2><br/>
            <FormGroup>
                <Label for="first">First Name</Label>
                <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.props.onChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="last">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.props.onChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.props.onChange} />
            </FormGroup>
            <Button onClick={this.props.onSubmitClick}>Submit</Button>
        </Form>);

        for (const [index, value] of this.props.examinersList.entries()) {
            items.push(<tr id={value.Email}>
                    <td headers="rowNum">{index+1}</td>
                    <td headers="firstName">{value.FirstName}</td>
                    <td headers="lastName">{value.LastName}</td>
                    <td headers="email">{value.Email}</td>
                    <td headers="viewScoresBtn"><Button>View Scores</Button></td>
                </tr>
             )
        }

        return (
            <div>
                <h1>Examiners</h1><br/>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>View Scores</th>
                        </tr>
                    </thead>
                    <tbody>
                       {items}
                    </tbody>
                </Table>
                <Button onClick={this.props.onCreateClick}>Create Examiner</Button><br/>
                {this.props.toggleForm === false ? true : examinersForm}
            </div>
        );
    }
}