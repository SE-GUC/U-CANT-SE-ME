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
        const res = await axios.get('http://localhost:5000/api/investors/trackMyCompany/5ca6229afd83c24bf091758e');
        const { data: posts }=res
       
        console.log(posts.tracking)
        this.setState({posts: posts.tracking });
        console.log('sds')
    };

        //   this.setState({companies: res.data.data});
        render(){
            return(
                <ul>
                <p>
                    {this.state.posts.map(x=>(
                        <li style={this.style()} key={x.company}>{x.company} 
                        </li>
                      
                    ))}
                 {this.state.posts._id}
                 </p> 
                    </ul>
            )
        }
        style = () => {
            return{
               // backgroundColor: '#f4a341',
                color: '#f4a341',
                
            }
        }
    };

 

