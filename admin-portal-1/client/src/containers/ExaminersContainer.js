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
            email: ""
        };

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.populateExaminersTable = this.populateExaminersTable.bind(this);

    }

    componentDidMount(){
        this.populateExaminersTable();
    }

    populateExaminersTable(){
        //Will eventually pull examiners from the database
        let examinersList = [
            {
                Email: "jdoe@email.com",
                FirstName: "Jane",
                LastName: "Doe"
            },
            {
                Email: "rsmith@email.com",
                FirstName: "Richard",
                LastName: "Smith"
            },
            {
                Email: "jrichards@email.com",
                FirstName: "Jack",
                LastName: "Richards"
            },
        ]

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
    }

    handleCreateClick(event) {
        event.preventDefault();

        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    handleSubmitClick(event) {
        event.preventDefault();
        let newExaminerList = this.state.examinersList;

        let newExaminer = {
            Email: this.state.email,
            FirstName: this.state.firstName,
            LastName: this.state.lastName
        }

        newExaminerList.push(newExaminer)

        this.setState({
            examinersList: newExaminerList
        })
    }

  
    render() {
      
        return (
            <div>
                <Examiners toggleForm={this.state.toggleForm} examinersList={this.state.examinersList} onCreateClick={this.handleCreateClick} onSubmitClick={this.handleSubmitClick} onChange={this.handleChange} />
            </div>
        );
    }
}
