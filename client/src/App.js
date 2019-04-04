import React, { Component } from 'react';
import Header from './components/layout/Header'
import Comments from './components/Comments';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    // comments: [
    //   {
    //     id: 1,
    //     author: 'Moe',
    //     content: 'Hello',
    //     timeStamp: '12:30 AM',
    //     read: false
    //   },
    //   {
    //     id: 2,
    //     author: 'Moe',
    //     content: 'Bye',
    //     timeStamp: '12:30 PM',
    //     read: false
    //   },
    //   {
    //     id: 3,
    //     author: 'Zizo',
    //     content: 'How are you',
    //     timeStamp: '1:35 AM',
    //     read: false
    //   }
    // ]
    comments: []
  }
    // comments: [
    //   {
    //     id: 1,
    //     author: 'Moe',
    //     content: 'Hello',
    //     timeStamp: '12:30 AM',
    //     read: false
    //   },
    //   {
    //     id: 2,
    //     author: 'Moe',
    //     content: 'Bye',
    //     timeStamp: '12:30 PM',
    //     read: false
    //   },
    //   {
    //     id: 3,
    //     author: 'Zizo',
    //     content: 'How are you',
    //     timeStamp: '1:35 AM',
    //     read: false
    //   }
    // ]
    async componentDidMount() {
      const investorID="5ca6229afd83c24bf091758e"
      const caseID="5ca62338fd83c24bf091758f"
      const {data: comments} = await axios.get(`http://localhost:5000/api/investors/lawyerComments/${investorID}/${caseID}`)
      this.setState({comments: comments.comments})
      // console.log('data', req.data)
    }
  
  markRead = (id) => {
    this.setState({ comments: this.state.comments.map(comment =>{
      if(comment._id === id)
        comment.read = !comment.read
      return comment
    } ) });
  }

  //filtering spreading and so on
  deleteComment = (id) => {
    this.setState({ todos: [...this.state.comments.filter(comment => comment.id !== id)]})
  }

  render() {
    console.log('in render', this.state.comments)
    return (
      <div className="App">
      <Header />
        <Comments comments={this.state.comments} markRead={this.markRead}/>
      </div>
    );
  }
}

export default App;
