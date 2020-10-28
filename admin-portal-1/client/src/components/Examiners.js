import React, { Component } from 'react';
import { Form, Button, Table, FormGroup, Label, Input, Card, CardBody, CardTitle, CardImg, CardText} from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

var QRCode = require('qrcode.react');

{/* <canvas id="canvas"></canvas>
 
 <script src="/build/qrcode.min.js"></script>
 <script>
   QRCode.toCanvas(document.getElementById('canvas'), 'sample text', function (error) {
     if (error) console.error(error)
     console.log('success!');
   })
 </script>  */}

export class Examiners extends Component {
    static displayName = Examiners.name;


    render() {
        let items = [];

        let examinersForm = (<div><Form><br/>
            <h2>Create Examiner</h2>
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
            <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" placeholder="Address" onChange={this.props.onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="age">Age</Label>
                <Input type="number" name="age" id="age" placeholder="Age" onChange={this.props.onChange} />
            </FormGroup>
            <Button onClick={this.props.onSubmitClick}>Submit</Button><br/>
        </Form><br/></div>);

        let qrCard = (<div>
            <Card style={{width: "350px"}}>
        <CardBody>
        <CardTitle style={{textAlign: "right"}}><Button outline onClick={this.props.onCloseQRClick}>X</Button></CardTitle>
        <CardTitle>Generated QR Code</CardTitle>
        </CardBody>
        <div style={{textAlign: "center"}}><img width="300px" src={this.props.qrcodeStr}/></div>
        <CardBody>
        <CardText>{this.props.currentExaminerQR}</CardText>
        </CardBody>
        </Card><br/></div>
        )

        for (const [index, value] of this.props.examinersList.entries()) {
            let dropDownOptions = (
                <UncontrolledDropdown>
                <DropdownToggle caret>
                  Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(event) => this.props.onQRCodeClick(event,index)}>Generate QR Code</DropdownItem>
                  <DropdownItem onClick={(event) => this.props.onDeleteClick(event,index)}>Delete Examiner</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
               )

            items.push(<tr id={value.email}>
                    <td headers="rowNum">{index+1}</td>
                    <td headers="firstName">{value.firstname}</td>
                    <td headers="lastName">{value.lastname}</td>
                    <td headers="email">{value.email}</td>
                    <td headers="address">{value.address}</td>
                    <td headers="age">{value.age}</td>
                    {/* <td headers="viewScoresBtn"><Button>View Scores</Button></td>
                    <td headers="qrCodeBtn"><Button onClick={(event) => this.props.onQRCodeClick(event,index)}>Generate QR Code</Button></td>
                    <td headers="deleteBtn"><Button onClick={(event) => this.props.onDeleteClick(event,index)}>Delete Examiner</Button></td>
                     */}<td headers="dropDown">{dropDownOptions}</td>
                </tr>
             )
        }

        return (
            <div>
                <h1>Examiners</h1><br/>
                {this.props.showQRCode === false ? true : <div style={{textAlign: "center", marginLeft: "290px"}}>{qrCard}</div>}
                <Button onClick={this.props.onCreateClick}>Create Examiner</Button><br/>
                {this.props.toggleForm === false ? true : examinersForm}<br/>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Age</th>
                        <th>Choose Options</th>
                        </tr>
                    </thead>
                    <tbody>
                       {items}
                    </tbody>
                </Table>
            </div>
        );
    }
}