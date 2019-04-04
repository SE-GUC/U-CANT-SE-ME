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
        const res = await axios.get('http://localhost:5000/api/notifications/');
        const { data: posts }=res
       
        console.log(posts.data)
        this.setState({posts: posts.data });
        console.log('sds')
    };

        //   this.setState({companies: res.data.data});
        render(){
            return(
                <ul>
                <p>hi
                    {this.state.posts.map(x=>(
                        <li key={x._id}>{x._id}</li>
                    ))}
                 {this.state.posts._id}
                 </p> 
                    </ul>
            )
        }
    };

 

