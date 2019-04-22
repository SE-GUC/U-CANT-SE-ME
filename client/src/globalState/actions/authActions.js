import axios from "axios";

import setAuthToken from "../../helpers/setAuthToken";

export const logout = () => {
    var token;
    setAuthToken(token)
};

export const login = async userData => {
    var admin,lawyer,reviewer,investor,token;
    let userType = ''
    admin = await axios.post(`http://localhost:5000/api/admins/login`,userData);
    lawyer = await axios.post(`http://localhost:5000/api/lawyers/login`,userData);
    reviewer = await axios.post(`http://localhost:5000/api/reviewers/login`,userData);
    investor = await axios.post(`http://localhost:5000/api/investors/login`,userData);
    if(admin.data.data){token = admin.data.data; userType='admin'}
    if(lawyer.data.data){token = lawyer.data.data; userType='lawyer'}
    if(investor.data.data){token = investor.data.data; userType='investor'}
    if(reviewer.data.data){token = reviewer.data.data; userType='reviewer'}
    if(!token)throw new Error("Wrong Email or Password")
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return userType
};