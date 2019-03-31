
/**
 * @jest-environment node
 */
const functions= require('./Lawyers');


test('create a lawyer', async()=>{

    expect.assertions(5);
    let body = {
        email: "fafasfgag67bobo.gamed@gmail.com",
        password: "mememe6m7emeboboememe",
        fullName: "ahmed76mmeememebobo",
        username: "joeO7b6o7bo"
      };

    const createLawyer = await functions.createLawyer(body);
    const getAllLawyers =await functions.getLawyers();
    const info=createLawyer.data.data;
 
     expect(info.fullName).toBe(body.fullName);
     expect(info.password).toBe(body.password);
     expect(info.username).toBe(body.username);
     expect(info.email).toBe(body.email);
    expect(getAllLawyers.data.data).toContainEqual(info);
     await functions.deleteLawyer(info._id);
});

test('delete a lawyer ', async()=>{
  jest.setTimeout(10000);
    expect.assertions(2);
    let body = {
        email: "dsadasdah16med@sab7oboil.com",
        password: "msascdem637sem31231bobo2e",
        fullName: "ahmedmca26sdasdamds7aemboboes",
        username: "jxbsOsd4d26ff7bobo"
      };
      const createLawyer = await functions.createLawyer(body);
      const info =createLawyer.data.data;
      const getLawyersAfterCreate =await functions.getLawyers();
      expect(getLawyersAfterCreate.data.data).toContainEqual(info);
      const deleteLawyer= await functions.deleteLawyer(info._id);
      const getLawyerAfterDelete=await functions.getLawyers();
      expect(getLawyerAfterDelete.data.data).not.toContainEqual(info);
});



test('testing updateLawyer', async()=>{
  expect.assertions(2);
  let body = {
    email: "dsadbobo.co6m",
    password: "bobobobobobobo6b",
    fullName: "bobobobob6bsss",
    username: "obsobsodbo6ds"
  };
  const newLawyer = await functions.createLawyer(body);
  const id =newLawyer.data.data._id;
  let bodyForUpdate={
    email:"bsdobdosb7od@gg7",
    password:"bobob7obob.c7omss"
  };
 const updateLawyer=  await functions.updateLawyer(id,bodyForUpdate);
  const getLawyerAfterUpdate=await functions.getOneLawyer(id);
   expect(String(getLawyerAfterUpdate.data.email)).toBe(bodyForUpdate.email);
   expect(getLawyerAfterUpdate.data.password).toBe(bodyForUpdate.password);
 const deleteLawyer= await functions.deleteLawyer(id);
});


test('testing get One Lawyer ', async()=>{
  expect.assertions(5);
  let body = {
    email: "bosdb7ods@g1ilzz7.com",
    password: "bs7odbzzzo1d7sbosd",
    fullName: "bsd7bo1bzzzz7",
    username: "bos7dbod1szz7o"
  };

  const createLawyer = await functions.createLawyer(body);
  const id =createLawyer.data.data._id;
  const getLawyerAfterCreate =await functions.getOneLawyer(id);
  const g={"_id":id,"__v":0};
  var obj = Object.assign(body, g);
  expect(getLawyerAfterCreate.data).toEqual(obj);
    expect(getLawyerAfterCreate.data.email).toBe(body.email);
   expect(getLawyerAfterCreate.data.password).toBe(body.password);
  expect(getLawyerAfterCreate.data.fullName).toBe(String(body.fullName));
   expect(getLawyerAfterCreate.data.username).toBe(String(body.username));
  const deletedLawyer= await functions.deleteLawyer(id);
});


test('testing getAllLawyers', async()=>{
  expect.assertions(2);
  let body = {
      email: "bobob7obob7@gmail.com",
      password: "bo7bos7dsdlv",
      fullName: "bds7o7bdsobdsb",
      username: "bsd7obod7sbodso"
    };
  const createLawyer= await functions.createLawyer(body);
  const getAllLawyers =await functions.getLawyers();
  expect(getAllLawyers.data.data).toContainEqual(createLawyer.data.data);
  expect(getAllLawyers.data.data.length).not.toBe(0);
  await functions.deleteLawyer(createLawyer.data.data._id);
  
});
