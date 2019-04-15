import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Comment from './ViewComments/Comment';
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import TextField from "@material-ui/core/TextField"
const serverURI = require("../config/keys").serverURI;


class AddComment extends Component {
  state = {
    case: {},
    text:'',
    authorID:'',
    type:'',
    actionMsg:''
  }

  handleTextBox = (event) => {
    this.setState({text: event.target.value});
  }

  componentDidMount() {
    if(this.props.location.state){
      axios.get(serverURI + `/cases/${this.props.location.state.caseID}`)
      .then(res => {
        if(res.data.data){
          this.setState({case:res.data.data})
          // put the hardcoded author ID here to test different cases and change state attributes accordingly (no authentication implemented yet)
          this.setState({authorID:'5ca7af43cd22733af4ab9d51',type:'lawyer'})
        }
      }).catch(err =>{
        this.setState({case:err.response.data.error});
      })
    }
  }

  render() {
    return (
      <header className="Comments">
        <div>
          {this.state.case.comments!==undefined? this.state.case.comments.length===0?<h1>No Comments Yet</h1> : this.state.case.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          )): null}
        </div>
        <div>
        <TextField
          id="standard-full-width"
          label="Comment"
          style={{ margin: 8 }}
          placeholder="Type Comment Here..."
          helperText="Make it descriptive!"
          fullWidth
          multiline
          margin="normal"
          onChange={this.handleTextBox}
          InputLabelProps={{
            shrink: true
          }}
        />
          {/* <textarea class="form-control md-textarea" type="text" placeholder="Add comment here" onChange={this.handleTextBox}/> */}
          {this.state.actionMsg===''?null:<div class={this.state.actionMsg==="Comment added successfully!"?"alert alert-success":"alert alert-danger"} role="alert">{this.state.actionMsg}</div>}
          <Button variant="outlined" color="primary" onClick={async()=> {
            try{
              const body = {
                body: this.state.text
              }
              if(this.state.type==='reviewer'){
                await axios.put(serverURI + `/reviewers/addCommentAsReviewer/${this.state.authorID}/${this.state.case._id}`,body);
                this.setState({actionMsg:'Comment added successfully!'})
              }
              else if(this.state.type==='lawyer'){
                await axios.put(serverURI + `/lawyers/addCommentAsLawyer/${this.state.authorID}/${this.state.case._id}`,body);
                this.setState({actionMsg:'Comment added successfully!'})
              }
              this.componentDidMount();
            }
            catch(err){
              this.setState({actionMsg:err.response.data.error})
            }
          }}>Add Comment
            <SendIcon />
          </Button>
          <br /> 
          <br />
        </div>
      </header>
    );
  }
}
 
export default AddComment;