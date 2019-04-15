import React, { Component } from "react";
import Case from "./Case";
import CaseSummary from "./CaseSummary";
import axios from 'axios'

class CaseSwitch extends Component {
  state = {
    cases: []
  };
  async componentDidMount() {
    const getCases = await axios.get("api/cases");
    for(let i=0;i<getCases.data.data.length;i++)
    {
        getCases.data.data[i].sid=`s${i}`
        getCases.data.data[i].cid=`c${i}`
    }
    this.setState({ cases: getCases.data.data });
}
handelClick (index) {
    
    const c=index.charAt(0);
    if(c==="c")
    {
        const newindex = index.replace("c","s");
        document.getElementById(index).style.display="none"
        document.getElementById(newindex).style.display="block"
    }
    else{
        const newindex = index.replace("s","c");
        document.getElementById(newindex).style.display="block"
        document.getElementById(index).style.display="none"
    }
}

  render() {
    const styles = {
        content: {
          display: "none"
        }
      };
    return (
      <div>
        {this.state.cases.map((x) => (
        <div>
            <button id={`${x.sid}`}  onClick={() => this.handelClick(x.sid)} > 
                <CaseSummary key={x._id} case={x}  />
            </button>
            <button style={styles.content} id={`${x.cid}`} onClick={() => this.handelClick(x.cid)} >
                 <Case key={x._id} case={x} />
             </button>
        </div>
        ))}
      </div>
    );
  }
}

export default CaseSwitch;
