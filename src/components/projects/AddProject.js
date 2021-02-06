import React, { Component } from 'react';
import axios from 'axios';
 
class AddProject extends Component {
  state = { 
      title: "", 
      description: "",
      status: ""
    }
   
  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5001/api/projects', {
        title: this.state.title,
        description: this.state.description
    })
    .then( (res) => {
        this.props.getData();
        this.setState({
            title: "",
            description: "",
            status: "Your project was created"
        });
    }, (err) => {
        console.log(err);
        this.setState({
            status: "Oops, something went wrong"
        });
    });
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  render(){
    return(
      <React.Fragment>

        { this.state.status !== '' ? <div>{this.state.status}</div> : null }

        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    )
  }
}
 
export default AddProject;