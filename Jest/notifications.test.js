/**
 * @jest-environment node
 */

const notifications = require('./notifications')

test("Get all notifications", async () => {
  expect.assertions(0);
  const {data}=await notifications.getAll();
 });
 test("Get notification by id ", async () => {
  
  
  
  const investor=await notifications.createInvestor();
  const cas = await notifications.createCase(investor._id);
   const body =  {
      "emailOfRecipient": "zeyad.khattab@gmail.com",
        "message": "Hey, Can you see US ?!!",
        "caseID": cas._id,
         "recipientId": investor._id
       };
    const {data}= await notifications.createNotification(body);
    await notifications.readNotification(data.data._id) 
    await notifications.deleteCase(cas._id);
    await notifications.deleteInvestor(investor._id);
    await notifications.deleteNotification(data.data._id);
});

test("Create a notification ", async () => {
  expect.assertions(1);
  let res=await notifications.getAll();
  let intialData=res.data.data
  const investor=await notifications.createInvestor();
  const cas = await notifications.createCase(investor._id);
   const body =  {
      "emailOfRecipient": "zeyad.khattab@gmail.com",
        "message": "Hey, Can you see US ?!!",
        "caseID": cas._id,
         "recipientId": investor._id
       };
    const {data}= await notifications.createNotification(body);
     res=await notifications.getAll();
    const finalData=res.data.data
    intialData.push(data.data);
    expect(intialData).toEqual(finalData); 
    await notifications.deleteNotification(data.data._id);
    await notifications.deleteCase(cas._id);
    await notifications.deleteInvestor(investor._id);
});

test("Create a notification With an invalid email does not do anything", async () => {
  expect.assertions(1);
  let res=await notifications.getAll();
  const intialData=res.data.data;
  const investor=await notifications.createInvestor();
  const cas = await notifications.createCase(investor._id);
   const body =  {
      "emailOfRecipient": "ssssss",
        "message": "Hey, Can you see US ?!!",
        "caseID": cas._id,
        "recipientId": investor._id
       };
    try{
      await notifications.createNotification(body);
    }
    catch(error){}
    res=await notifications.getAll();
    const finalData=res.data.data
   expect(intialData).toEqual(finalData); 
   await notifications.deleteCase(cas._id);
    await notifications.deleteInvestor(investor._id);
});


// UPDATE
test("Update a notification", async () => {
  expect.assertions(1);
  const oldMessage="I have reached a critical conclusion!!!"
  const newMessage="But did you commit on what you have decided?? :( "
  const newDate= "2008-09-15";
  const newDateReturnFormat="2008-09-15T00:00:00.000Z";
  const investor=await notifications.createInvestor();
  const cas = await notifications.createCase(investor._id);
  //The body of the request
  let body =  {
      "emailOfRecipient": "hamada.yel3ab@gmail.com",
      "message": oldMessage,
      "caseID": cas._id,
      "recipientId": investor._id
    };


  // Create the Notification
  let res = await notifications.createNotification(body)

  let createdNotification = res.data.data;
   body.message = newMessage;
  body.dateSeen=newDate;
  createdNotification.message=newMessage
  createdNotification.dateSeen=newDateReturnFormat;
  

  //Update the newly created Notification and get it
  
  const { data } =  await notifications.updateNotification(createdNotification._id, body);
  
  //Delete the newly created Notification
  await notifications.deleteNotification([createdNotification._id]);

  //Check if it was updated
  expect(data.data).toEqual(createdNotification);
  await notifications.deleteCase(cas._id);
  await notifications.deleteInvestor(investor._id);
});
// DELETE
test("Delete a notification", async () => {
  expect.assertions(1);
  const investor=await notifications.createInvestor();
  const cas = await notifications.createCase(investor._id);
    const body =  {
        "emailOfRecipient": "boyce.avenue@gmail.com",
          "message": "I hope you are having fun testing :)",
          "caseID": cas._id,
         "recipientId": investor._id
        };
  let res = await notifications.createNotification(body);

  let createdNotification = res.data.data;

  await notifications.deleteNotification(createdNotification._id);
  await notifications.deleteCase(cas._id);
  await notifications.deleteInvestor(investor._id);
  const { data } = await notifications.getAll();
  expect(data).not.toContain(createdNotification);
});
test("Update a notification with an invalid attrbiute does not change anything", async () => {
  expect.assertions(1);
  const investor=await notifications.createInvestor();
  const cas = await notifications.createCase(investor._id);
  const body =  {
    "emailOfRecipient": "boyce.avenue@gmail.com",
      "message": "I hope you are having fun testing :)",
      "caseID": cas._id,
         "recipientId": investor._id
     
  };
let res = await notifications.createNotification(body);
let oldNotification=res.data.data;
const updateBody =  {
  "Attribute that ":"does not exist"
   
};
try{await notifications.updateNotification(oldNotification._id, updateBody);}
catch(error){}


let {data}=await notifications.deleteNotification(oldNotification._id);
let newNotification=data.data;
expect(newNotification).toEqual(oldNotification);
await notifications.deleteCase(cas._id);
  await notifications.deleteInvestor(investor._id);
});
