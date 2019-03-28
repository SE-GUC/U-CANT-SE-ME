/**
 * @jest-environment node
 */

const axios = require("axios");
/**
 *
 * @param urlSuffix The suffix of url e.g investors, cases, etc...
 * @param params  The parameters of the request URL given in order.
 * @return Returns the complete URL for the request.
 */

function createURL(urlSuffix, params = []) {
  let url = "http://localhost:3000/api/" + urlSuffix + "/";
  for (let i = 0; i < params.length; i++) url += params[i] + "/";
  return url;
}

async function getAll(urlSuffix){
  const {data}=await axios.get(createURL(urlSuffix));
  return data.data;
}
test("Get all notifications initial test", async () => {
  expect.assertions(0);

  // data is the response object from the server
  const data=await getAll("notifications");
 
  console.log(data);
});

test("Create a notification ", async () => {
  expect.assertions(1);
 
  let intialData=await getAll("notifications");
 
  // The body of the request
  const body =  {
      "emailOfRecipient": "zeyad.khattab@gmail.com",
        "message": "Hey, Can you see US ?!!",
        "caseID": "5c968d4f233b707e2a617bcb",
         "recipientId": "5c9645f36e2ef06af84adccf"
       
    };
    
    const {data}= await axios.post(createURL("notifications"), body);
    console.log(data.data);
    const finalData=await getAll("notifications");
    
   
    intialData.push(data.data);
    
   expect(intialData).toEqual(finalData); 
  
});

test("Create a notification With an invalid email does not do anything", async () => {
  expect.assertions(1);
 
  const intialData=await getAll("notifications");
 
  // The body of the request
  const body =  {
      "emailOfRecipient": "ssssss",
        "message": "Hey, Can you see US ?!!",
        "caseID": "5c968d4f233b707e2a617bcb",
         "recipientId": "5c9645f36e2ef06af84adccf"
       
    };
    try{
      await axios.post(createURL("notifications"), body);
    }
    catch(error)
    {
      
    }
      
       
   const finalData=await getAll("notifications");
   expect(intialData).toEqual(finalData); 
  
});