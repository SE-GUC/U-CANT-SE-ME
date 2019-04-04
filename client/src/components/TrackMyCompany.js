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
        const res = await axios.get('http://localhost:5000/api/notifications');
        const { data: posts }=res
        console.log(res)
        console.log("posts")
        console.log(posts)
        this.setState({posts: posts.data });
        console.log('sds')
    };

        //   this.setState({companies: res.data.data});
        render(){
            return(
                <ul>
                <p>hi
                    {console.log(this.state.posts.id)}
                 {this.state.posts._id}
                 </p> 
                    </ul>
            )
        }
    };

 

