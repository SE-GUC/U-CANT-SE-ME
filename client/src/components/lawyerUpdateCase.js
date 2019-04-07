import React from 'react'
import axios from 'axios';
export default class lawyerUpdateCase extends React.Component {
    
    constructor(props) {
            super(props)
            this.state = {
              companyType: '',
              regulatedLaw: '',
              legalFormOfCompany: '',
              companyNameArabic: '',
              companyNameEnglish: '',
              headOfficeGovernorate: '',
              headOfficeCity: '',
              headOfficeAddress: '',
              phoneNumber: '',
              fax: '',
              currencyUsedForCapital: '',
              capital: ''
              
        }
    }

    submit= async()=> {
        var form=document.getElementById("lawyerUpdate")
        const body =  {
            form:{
             
            }
        }
        if(!(form.companyType.value===""))
          body.form.companyType=form.companyType.value
          if(!(form.regulatedLaw.value===""))
          body.form.regulatedLaw=form.regulatedLaw.value
          if(!(form.legalFormOfCompany.value===""))
          body.form.legalFormOfCompany=form.legalFormOfCompany.value
          if(!(form.companyNameArabic.value===""))
          body.form.companyNameArabic=form.companyNameArabic.value
          if(!(form.companyNameEnglish.value===""))
          body.form.companyNameEnglish=form.companyNameEnglish.value
          if(!(form.headOfficeGovernorate.value===""))
          body.form.headOfficeGovernorate=form.headOfficeGovernorate.value
          if(!(form.headOfficeCity.value===""))
          body.form.headOfficeCity=form.headOfficeCity.value
          if(!(form.headOfficeAddress.value===""))
          body.form.headOfficeAddress=form.headOfficeAddress.value
          if(!(form.phoneNumber.value===""))
          body.form.phoneNumber=form.phoneNumber.value
          if(!(form.fax.value===""))
          body.form.fax=form.fax.value
          if(!(form.currencyUsedForCapital.value===""))
          body.form.currencyUsedForCapital=form.currencyUsedForCapital.value
          if(!(form.capital.value===""))
          body.form.capital=form.capital.value
          


          console.log("hena")
        console.log(body)
        console.log("hafsh5ak")
            const caseID='5ca8a6c06f7661e423afc714'
            const lawyerID='5ca76f5f00b48e09001936e7'
            try
            {
                await axios.put(`http://localhost:5000/api/lawyers/update/${lawyerID}/${caseID}`,body)
                this.setState({val:'Successfully updated'})
            }
            catch(error)
            {
                this.setState({val:'something is wrong'})
            }
        
    }


    render() {
        return (
          <div>
              <br/>
              <h2>Update Case</h2>
            <form id="lawyerUpdate">
            Company type: <select className="form-control" name="companyType"  >
          <option value="">Choose type</option>
          <option value="SPC">SPC</option>
          <option value="SSC">SSC</option>
        </select>
          <br/>
          Regulated law: <input type="text" name="regulatedLaw"/><br/>
          <br/>
          Legal form of company: <input type="text" name="legalFormOfCompany"/><br/>
    
          <br/>
          Company name in arabic: <input type="text" name="companyNameArabic"/><br/>
          <br/>
          Company name in english: <input type="text" name="companyNameEnglish"/><br/>
          <br/>
          head office governorate: <input type="text" name="headOfficeGovernorate"/><br/>
          <br/>
          head office city: <input type="text" name="headOfficeCity"/><br/>
          <br/>
          head office address: <input type="text" name="headOfficeAddress"/><br/>
          <br/>
          phone number: <input type="text" name="phoneNumber"/><br/>
          <br/>
          fax: <input type="text" name="fax"/><br/>
          <br/>
          currency used for capital: <input type="text" name="currencyUsedForCapital"/><br/>
          
          <br/>
          capital: <input type="text" name="capital"/><br/>
          <br/>
                </form>
                <button onClick={this.submit}>submit</button><br/>
                {this.state.val}
          </div>
        );
      }
};