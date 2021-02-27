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
            owner: "",
            imageUrl: ""
        }
    }

    componentDidMount() {
        const params = this.props.match.params;
        axios.get(`${process.env.REACT_APP_API_URL}/projects/${params.id}`, {withCredentials:true})
            .then(responseFromApi => {
                const { title, description, _id, owner, imageUrl } = responseFromApi.data;
                this.setState({
                    title: title,
                    description: description,
                    _id: _id,
                    owner: owner,
                    imageUrl: imageUrl
                });
            }, err => {
                console.log(err)
            });
    }


    deleteProject = () => {
        const { params } = this.props.match;
        axios.delete(`${process.env.REACT_APP_API_URL}/projects/${params.id}`, {withCredentials:true})
            .then(() => {
                this.props.history.push('/');
            }, err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <img src={this.state.imageUrl} />
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
                <Link to={'/'}>Back Home</Link>
            </div>
        )
    }
}

export default ProjectDetails;