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
  expect.assertions(2);
 
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
  expect(intialData.length).toBe(finalData.length)
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
test("Create a Notification then delete it", async () => {
  expect.assertions(0);

  
  const body =  {
    "emailOfRecipient": "ohzora.tsubasa@gmail.com",
      "message": "HASHIREEEE!!",
      "caseID": "5c968d4f233b707e2a617bcb",
       "recipientId": "5c9645f36e2ef06af84adccf"
     
  };

  const res = await axios.post(createURL("notifications"), body);

  await axios.delete(createURL("notifications", [res.data._id] ));

});

// UPDATE
test("Update an investor initial test", async () => {
  expect.assertions(1);
  const oldMessage="I have reached a critical conclusion!!!"
  const newMessage="But did you commit on what you have decided?? :( "
  //The body of the request
  let body =  {
    "emailOfRecipient": "hamada.yel3ab@gmail.com",
      "message": oldMessage,
      "caseID": "5c968d4f233b707e2a617bcb",
       "recipientId": "5c9645f36e2ef06af84adccf"
     
  };

  //Create the Investor
  let res = await axios.post(createURL("notifications"), body);

  let createdNotification = res.data.data;
  console.log(createdNotification)
  body.message = newMessage;
  createdNotification.message=newMessage
  
  

  //Update the newly created investor and get it
  
  const { data } =  await axios.put(createURL("notifications", [createdNotification._id] ), body);
  
  //Delete the newly created investor
  await axios.delete(createURL("notifications", [createdNotification._id] ));

  //Check if it was updated
  expect(data.data).toEqual(createdNotification);
});
//DELETE
test("Delete an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  const body =  {
        "emailOfRecipient": "boyce.avenue@gmail.com",
          "message": "I hope you are having fun testing :)",
          "caseID": "5c968d4f233b707e2a617bcb",
           "recipientId": "5c9645f36e2ef06af84adccf"
         
      };
  let res = await axios.post(createURL("notifications"), body);

  let createdNotification = res.data.data;

  await axios.delete(createURL("notifications", [createdNotification._id] ));

  const { data } = await axios.get(createURL("notifications"));

  expect(data).not.toContain(createdNotification);
});
