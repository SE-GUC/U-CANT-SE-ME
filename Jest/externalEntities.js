const axios = require('axios');

const functions = {
        getExernalEntities: async() => {
          const externalEntities = await axios.get('http://localhost:3000/api/externalEntities/');
          return externalEntities;
        },
        getSpecificExternalEntity: async(extEntityID) => {
          const extEntity = await axios.get(`http://localhost:3000/api/externalEntities/${extEntityID}`);
          return extEntity;
        },
        getSpecificExternalEntity: async(extEntityID) => {
          const extEntity = await axios.get(`http://localhost:3000/api/externalEntities/${extEntityID}`);
          return extEntity;
        },
        createExternalEntity: async(body) => {
          const extEntity = await axios.post('http://localhost:3000/api/externalEntities/',body);
          return extEntity;
        },
        updateExternalEntity: async(extEntityID,body) => {
          const extEntity = await axios.put(`http://localhost:3000/api/externalEntities/${extEntityID}`,body);
          return extEntity;
        },
        deleteExternalEntity: async(extEntityID) => {
          const extEntity = await axios.delete(`http://localhost:3000/api/externalEntities/${extEntityID}`);
          return extEntity;
        }
};
module.exports = functions;
