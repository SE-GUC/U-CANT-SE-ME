const axios = require('axios')

const admins = {
    default: async () => {
        return await axios.get('http://localhost:3000/api/admins/')
    },
    readAdmin: async (id) =>{
        return await axios.get(`http://localhost:3000/api/admins/${id}`)
    },
    createAdmin: async (req)=>{
        return await axios.post('http://localhost:3000/api/admins/joi', req)
    },
    deleteAdmin: async (id) => {
        return await axios.delete(`http://localhost:3000/api/admins/joi/${id}`)
    },
    updateAdmin: async (id,req) => {
        return await axios.put(`http://localhost:3000/api/admins/update/${id}`,req)
    }

}


  
 
module.exports = admins
