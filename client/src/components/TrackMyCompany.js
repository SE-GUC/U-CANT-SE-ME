import React from 'react'
import axios from 'axios';
export default class TrackMyCompany extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[]
    }
    
  }
//    componentDidMount(){
//       console.log("yy");
//        axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res=>{
//         console.log(res)
//         this.setState({companies:res});
//        });

       async componentDidMount() {
        const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        this.setState({posts: posts });
        console.log('sds')
    };

        //   this.setState({companies: res.data.data});
        render(){
            return(
                <ul>
                <p>hi
                    {console.log(this.state.posts.id)}
                 {this.state.posts.title}
                 </p> 
                    </ul>
            )
        }
    };

 

