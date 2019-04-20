import React from 'react'
import axios from 'axios';
import Stepper from 'react-stepper-horizontal'
import parseJwt from '../helpers/decryptAuthToken'
import {Redirect} from 'react-router-dom';
export default class TrackMyCompany extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            home:0
        }
    }

    async componentDidMount() {
        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
          }
          try{
              await axios.get('../api/investors/auth')
          }catch(err){
              console.log(err);
            alert("You are not allowed");
            this.setState({ home: 1 });
            return;
          }
          this.setState({ home: 2 });
        try{
            const data = parseJwt(localStorage.jwtToken)
            const id = data.id
            const res = await axios.get(`../api/investors/trackMyCompany/${id}`);
            const { data: posts } = res
            console.log(posts)
            this.setState({ posts: posts.tracking });
        }
        catch(error){
            this.setState({posts: []})
        }
    };



    render() {

        return (
            <ul>
                <p>
                    {this.state.posts.map(x => {
                        var str = x.company + "";
                        var n = str.split(" ");
                        var k = n[n.length - 2];
                        if (k.endsWith('OnUpdate'))
                            return <li
                                key={str}>{str}
                                <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Accepted' }]} activeStep={0} />
                            </li>

                        if (k.endsWith('WaitingForLawyer'))
                            return <li
                                key={str}>{str}
                                <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Accepted' }]} activeStep={1} />
                            </li>
                        if (k.endsWith('AssignedToLawyer'))
                            return <li
                                key={str}>{str}
                                <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Accepted' }]} activeStep={2} />
                            </li>
                        if (k.endsWith('WaitingForReviewer'))
                            return <li
                                key={str}>{str}
                                <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Accepted' }]} activeStep={3} />
                            </li>
                        if (k.endsWith('AssignedToReviewer'))
                            return <li
                                key={str}>{str}
                                <Stepper steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Accepted' }]} activeStep={4} />
                            </li>
                        if (k.endsWith('Accepted'))
                            return <li
                                key={str}>{str}
                                <Stepper activeColor='#41f453' steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Accepted' }]} activeStep={5} />
                            </li>
                        if (k.endsWith('Rejected'))
                            return <li
                                key={str}>{str}
                                <Stepper activeColor='#f44141' steps={[{ title: 'On Update' }, { title: 'Waiting For Lawyer' }, { title: 'Assigned To Lawyer' }, { title: 'Waiting For Reviewer' }, { title: 'Assigned To Reviewer' }, { title: 'Rejected' }]} activeStep={5} />
                            </li>
                        if(k.endsWith('Established'))
                            return <li
                            key={str}>{str}
                        </li>


                    })}
                    {this.state.posts._id}
                </p>
            </ul>
        )
    }


};