import React, { Component } from 'react';
import { Examiners } from '../components/Examiners';
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');


export class ExaminersContainer extends Component {
    static displayName = ExaminersContainer.name;

    constructor(props) {
        super(props);

        //getting a cookie
        console.log(this.props.cookies.get('authorizationToken'));

        
        this.state = {
            examinersList: [],
            toggleForm: false,
            showQRCode: false,
            qrcodeStr: "",
            firstName: "",
            lastName: "",
            email: "",
            age: 1,
            address: "",
            authToken: this.props.cookies.get('authorizationToken'),
            currentExaminerQR: ""

        };

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleQRCodeClick = this.handleQRCodeClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCloseQRCode = this.handleCloseQRCode.bind(this);
        this.populateExaminersTable = this.populateExaminersTable.bind(this);

    }

    async componentDidMount(){
        await this.props.checkValidToken(this.state.authToken);

        this.populateExaminersTable();
    }

    async populateExaminersTable(){
        let examinersList = [];


        let response = await fetch('/v1/examiner/get-all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AuthorizationKey': this.state.authToken
            },
        });

        const data = await response.json();

        console.log(data)

        examinersList = data;

        this.setState({
            examinersList: examinersList
        })

    }

    handleChange(event) {
        const value = event.target;

        if (value.name === "email") {
            this.setState({
                email: value.value,
            })
        }
        else if (value.name === "firstName") {
            this.setState({
                firstName: value.value,
            })
        }
        else if (value.name === "lastName") {
            this.setState({
                lastName: value.value,
            })
        }
        else if (value.name === "age") {
            this.setState({
                age: value.value,
            })
        }
        else if (value.name === "address") {
            this.setState({
                address: value.value,
            })
        }
    }

    async handleQRCodeClick(event, position){
        event.preventDefault();

        let generateExaminer = this.state.examinersList[position];

        var token = jwt.sign({
            u_id: generateExaminer._id,
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
            currentExaminerQR: generateExaminer.firstname + " " + generateExaminer.lastname
        })

    }

    handleCreateClick(event) {
        event.preventDefault();

        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    async handleSubmitClick(event) {
        event.preventDefault();

        let newExaminer = {
            email: this.state.email,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            address: this.state.address,
            age: this.state.age
        };

        let response = await fetch('/v1/examiner/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AuthorizationKey': this.state.authToken
            },
            body: JSON.stringify(newExaminer)
        });

        this.populateExaminersTable();

    }

    async handleDeleteClick(event, position){
        let newExaminerList = this.state.examinersList;

        let deleteExaminer = newExaminerList[position];

        newExaminerList.splice(position, 1);

        console.log(deleteExaminer);

        let response = await fetch('/v1/examiner/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AuthorizationKey': this.state.authToken
            },
            body: JSON.stringify(deleteExaminer)
        });

        this.populateExaminersTable();

    }

    handleCloseQRCode(){
        this.setState({
            showQRCode: false
        })
    }

  
    render() {
        return (
            <div>
                <Examiners 
                    toggleForm={this.state.toggleForm} 
                    onDeleteClick={this.handleDeleteClick} 
                    examinersList={this.state.examinersList} 
                    currentExaminerQR={this.state.currentExaminerQR}
                    onCreateClick={this.handleCreateClick} 
                    onSubmitClick={this.handleSubmitClick} 
                    onCloseQRClick={this.handleCloseQRCode}
                    onQRCodeClick={this.handleQRCodeClick}
                    onChange={this.handleChange} 
                    showQRCode={this.state.showQRCode}
                    qrcodeStr={this.state.qrcodeStr}
                />
            </div>
        );
    }
}
