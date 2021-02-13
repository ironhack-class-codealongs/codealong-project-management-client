import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject';

class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            _id: "",
            owner: ""
        }
    }

    componentDidMount() {
        const params = this.props.match.params;
        axios.get(`http://localhost:5090/api/projects/${params.id}`, {withCredentials:true})
            .then(responseFromApi => {
                const { title, description, _id, owner } = responseFromApi.data;
                this.setState({
                    title: title,
                    description: description,
                    _id: _id,
                    owner: owner
                });
            }, err => {
                console.log(err)
            });
    }


    deleteProject = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5090/api/projects/${params.id}`, {withCredentials:true})
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
                <div>
                    {
                        this.state.title !== "" && 
                        this.props.user && 
                        this.props.user._id === this.state.owner ?
                            <div>
                                <EditProject theProject={this.state} {...this.props} />
                                <button onClick={() => this.deleteProject()}>Delete project</button>
                            </div> : 
                            null 
                    }
                </div>
                <Link to={'/projects'}>Back to projects</Link>
            </div>
        )
    }
}

export default ProjectDetails;