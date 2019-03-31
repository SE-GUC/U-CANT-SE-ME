
/**
 * @jest-environment node
 */
const functions= require('./Lawyers');


test('create a lawyer', async()=>{

    expect.assertions(5);
    let body = {
        email: "fafasfgag670bobo.gamed@gmail.com",
        password: "mememe60m7emeboboememe",
        fullName: "ahmed706mmeememebobo",
        username: "joeO70b6o7bo"
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
        email: "dsadasdah106med@0sab7oboil.com",
        password: "msascd0em6370sem31231bobo2e",
        fullName: "ahmed0mca260sdasdamds7aemboboes",
        username: "jxbsOsd40d026ff7bobo"
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
    email: "dsadbo3123bo.1co60m12",
    password: "bobo3213b1obobo0bobo612b",
    fullName: "bobo3123bob1ob6b0sss12",
    username: "obsob3122sod1bo6d0s12"
  };
  const newLawyer = await functions.createLawyer(body);
  const id =newLawyer.data.data._id;
  let bodyForUpdate={
    email:"bsdob132dosb72od@1gg7120",
    password:"bobob732ob2ob.1c7o0ms12s"
  };
 const updateLawyer=  await functions.updateLawyer(id,bodyForUpdate);
  const getLawyerAfterUpdate=await functions.getOneLawyer(id);
   expect(String(getLawyerAfterUpdate.data.email)).toBe(bodyForUpdate.email);
   expect(getLawyerAfterUpdate.data.password).not.toBe(newLawyer.data.data.password);
 const deleteLawyer= await functions.deleteLawyer(id);
});


test('testing get One Lawyer ', async()=>{
  expect.assertions(5);
  let body = {
    email: "bosdb7od10s@g1ilzz7.com",
    password: "bs7odb10zzzo1d7sbosd",
    fullName: "bsd7bo110bzzzz7",
    username: "bos7dbod101szz7o"
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
      email: "bobob7obob007@gmail.com",
      password: "bo7bos7d00sdlv",
      fullName: "bds7o7bdso00bdsb",
      username: "bsd7obod70s0bodso"
    };
  const createLawyer= await functions.createLawyer(body);
  const getAllLawyers =await functions.getLawyers();
  expect(getAllLawyers.data.data).toContainEqual(createLawyer.data.data);
  expect(getAllLawyers.data.data.length).not.toBe(0);
  await functions.deleteLawyer(createLawyer.data.data._id);
  
});
