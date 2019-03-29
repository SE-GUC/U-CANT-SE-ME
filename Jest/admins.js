const axios = require('axios')

const admins = {
    default: async () => {
        return axios.get('http://localhost:3000/api/admins/')
    },
    readAdmin: async (id) =>{
        return axios.get(`http://localhost:3000/api/admins/${id}`)
    },
    createAdmin: async (req)=>{
        return axios.post('http://localhost:3000/api/admins/joi', req)
    },
    deleteAdmin: async (id) => {
        return axios.delete(`http://localhost:3000/api/admins/joi/${id}`)
    },
    updateAdmin: async (id,req) => {
        return axios.put(`http://localhost:3000/api/admins/update/${id}`,req)
    }

}


  
 
module.exports = admins