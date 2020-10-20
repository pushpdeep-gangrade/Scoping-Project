import React, { Component } from 'react';
import { Examiners } from '../components/Examiners';


export class ExaminersContainer extends Component {
    static displayName = ExaminersContainer.name;

    constructor(props) {
        super(props);

        
        this.state = {
            examinersList: [],
            toggleForm: false,
            firstName: "",
            lastName: "",
            email: "",
            age: 1,
            address: ""
        };

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.populateExaminersTable = this.populateExaminersTable.bind(this);

    }

    componentDidMount(){
        this.populateExaminersTable();
    }

    async populateExaminersTable(){
        //Will eventually pull examiners from the database
       /*  let examinersList = [
            {
                Email: "jdoe@email.com",
                FirstName: "Jane",
                LastName: "Doe",
                Address: "123 JDoe Street",
                Age: 31
            },
            {
                Email: "rsmith@email.com",
                FirstName: "Richard",
                LastName: "Smith",
                Address: "123 RSmith Road",
                Age: 20
            },
            {
                Email: "jrichards@email.com",
                FirstName: "Jack",
                LastName: "Richards",
                Address: "123 JRichards Lane",
                Age: 27
            },
        ] */
        
        let examinersList = [];

        const response = await fetch('/v1/examiner/get-all');
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

    handleCreateClick(event) {
        event.preventDefault();

        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    async handleSubmitClick(event) {
        event.preventDefault();
        let newExaminerList = this.state.examinersList;

        let newExaminer = {
            email: this.state.email,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            address: this.state.address,
            age: this.state.age
        };

        newExaminerList.push(newExaminer);

        let response = await fetch('/v1/examiner/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExaminer)
        });

        this.setState({
            examinersList: newExaminerList
        })
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
            },
            body: JSON.stringify(deleteExaminer)
        });

        this.setState({
            examinersList: newExaminerList
        })

    }

  
    render() {
        return (
            <div>
                <Examiners 
                    toggleForm={this.state.toggleForm} 
                    onDeleteClick={this.handleDeleteClick} 
                    examinersList={this.state.examinersList} 
                    onCreateClick={this.handleCreateClick} 
                    onSubmitClick={this.handleSubmitClick} 
                    onChange={this.handleChange} 
                />
            </div>
        );
    }
}
