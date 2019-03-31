const axios = require('axios');
const functions={
    getLawyers : async ()=>{
        let getAll = await axios.get("http://localhost:3000/api/lawyers");
        return getAll;
    },
    getOneLawyer : async (id)=>{
        let getOne= await axios.get(`http://localhost:3000/api/lawyers/${id}`);
        return getOne;
    },
    createLawyer : async(body) =>{
                  
        let createOne = await axios.post("http://localhost:3000/api/lawyers/",body);
        return createOne;
    },
    deleteLawyer : async(id)=>{
        let deleteOne = await axios.delete(`http://localhost:3000/api/lawyers/${id}`);
        return deleteOne 
    },
    updateLawyer : async(id,body)=>{
        let updateOne =await axios.put(`http://localhost:3000/api/lawyers/${id}`,body);
        return updateOne;
    }
}
module.exports= functions;