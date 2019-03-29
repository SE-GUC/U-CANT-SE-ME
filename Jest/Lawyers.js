const axios = require('axios');
function createURL(urlSuffix, params = []) {
    let url = "http://localhost:3000/api/" + urlSuffix + "/";
    for (let i = 0; i < params.length; i++) url += params[i] + "/";
    return url;
  }
const functions={
    getLawyers : async ()=>{
        let getAll = await axios.get(createURL("lawyers"));
        return getAll;
       

    },
    getOneLawyer : async (id)=>{
        let getOne= await axios.get(createURL("lawyers",[id]));
        return getOne;
    },
    createLawyer : async(body) =>{
                  
        let createOne = await axios.post(createURL("lawyers"),body);
        return createOne;
    },
    deleteLawyer : async(id)=>{
        let deleteOne = await axios.delete(createURL("lawyers",[id]));
        return deleteOne 
    }
}
module.exports= functions;