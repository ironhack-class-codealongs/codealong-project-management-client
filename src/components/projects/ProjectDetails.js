import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject';

class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: ""
        }
    }

    componentDidMount() {
        this.getSingleProject();
    }

    getSingleProject = () => {

        const params = this.props.match.params;

        axios.get(`http://localhost:5001/api/projects/${params.id}`)
            .then(responseFromApi => {
                const { title, description, _id } = responseFromApi.data;
                this.setState({
                    title: title,
                    description: description,
                    _id: _id
                });
            }, err => {
                console.log(err)
            })
    }

    renderEditForm = () => {
        if (!this.state.title) {
            this.getSingleProject();
        } else {
            return <EditProject theProject={this.state} {...this.props} />
        }
    }

    deleteProject = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5001/api/projects/${params.id}`)
            .then(() => {
                this.props.history.push('/projects');  
            }, err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
                <div>{this.renderEditForm()} </div>
                <button onClick={() => this.deleteProject()}>Delete project</button>
                <Link to={'/projects'}>Back to projects</Link>
            </div>
        )
    }
}

export default ProjectDetails;