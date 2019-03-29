
/**
 * @jest-environment node
 */
const functions= require('./Lawyers');

test('create a lawyer', async()=>{

    expect.assertions(4);
    let body = {
        email: "fafasfgag.gamed@gmail.com",
        password: "mememememeememe",
        fullName: "ahmedmmeememe",
        username: "joeO7"
      };

    const x = await functions.createLawyer(body);
    const info=x.data.data;
     expect(info.fullName).toBe(body.fullName);
     expect(info.password).toBe(body.password);
     expect(info.username).toBe(body.username);
     expect(info.email).toBe(body.email);

     await functions.deleteLawyer(info._id);
    // const { alllawyers} = await functions.getLawyers();
    //  console.log(alllawyers);
    //  // expect(alllawyers.data).toContain(info);
});

test('delete a lawyer ', async()=>{
  jest.setTimeout(10000);
    expect.assertions(1);
    let body = {
        email: "dsadasdahmed@sail.com",
        password: "msascdemsem312312e",
        fullName: "ahmedmcasdasdamdsaemes",
        username: "jxbsOsdd2ff7"
      };
      const x = await functions.createLawyer(body);
      const info =x.data.data;
      const y =await functions.getLawyers();
     
      
      const z= await functions.deleteLawyer(info._id);
      const f=await functions.getLawyers();

   //  expect(y.data.data).toContain(info);
      expect(f.data.data).not.toContain(info);
});



test('testing updateLawyer', async()=>{
  expect.assertions(2);
  let body = {
    email: "dsadasdahmedmcdsaddsadccccmmohamedcc.gamed@gmdsadasail.com",
    password: "memememesasacccxzccmedsascdemseme",
    fullName: "ahmedmmeesasdccxzczxzcccddcasdasdamdsaemes",
    username: "joesasadsaddaszxczxcasdsaasddasdagvcxbsOsff7"
  };
  const x = await functions.createLawyer(body);
  const id =x.data.data._id;
  let bodyForUpdate={
    email:"dondodondondondondon@gg",
    password:"password.comss"
  };
 const v=  await functions.updateLawyer(id,bodyForUpdate);
  const yy=await functions.getOneLawyer(id);
   expect(String(yy.data.email)).toBe(bodyForUpdate.email);
   expect(yy.data.password).toBe(bodyForUpdate.password);
 const y= await functions.deleteLawyer(id);
});


test('testing get One Lawyer ', async()=>{
  expect.assertions(5);
  let body = {
    email: "dsadasdahmedmccccd@gmdsadasail.com",
    password: "memememesasacccsadasdsascdemseme",
    fullName: "ahmezcdasdasccddcasdasdamdsaemes",
    username: "sdsaasddasdagvcxbsOsff7"
  };
  const x = await functions.createLawyer(body);
  const id =x.data.data._id;
  const yy =await functions.getOneLawyer(id);
  await functions.deleteLawyer(id);
  const g={"_id":id,"__v":0};
  var obj = Object.assign(body, g);
  expect(yy.data).toEqual(obj);
    expect(yy.data.email).toBe(body.email);
   expect(yy.data.password).toBe(body.password);
  expect(yy.data.fullName).toBe(String(body.fullName));
   expect(yy.data.username).toBe(String(body.username));
});
test('testing getAllLawyers', async()=>{
  //expect.assertions(1);
  // let body = {
  //     email: "fafasfgagagagvcv.gamed@gmail.com",
  //     password: "mememememeememe",
  //     fullName: "ahmedmmeememe",
  //     username: "joeO7"
  //   };
  // const x= await functions.createLawyer(body);
  // const y =await functions.getLawyers();
  // await functions.deleteLawyer(x.data.data._id);
  // console.log(typeof(y.data.data));
  // console.log(typeof(x.data.data));
  //   const z=y.data.data;
  //   console.log(z.find(x.data.data));
    //expect(z).toContain(x.data.data);
   // expect(z).toContainObject(x.data.data);
  // const { alllawyers} = await functions.getLawyers();
  //  console.log(alllawyers);
  //  // expect(alllawyers.data).toContain(info);
  expect.assertions(0);
  const all =await functions.getLawyers;
  console.log(all);
});
