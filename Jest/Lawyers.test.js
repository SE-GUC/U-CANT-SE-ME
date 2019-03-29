
/**
 * @jest-environment node
 */
const functions= require('./Lawyers');

test('create a lawyer', async()=>{
    expect.assertions(4);
    let body = {
        email: "fafasfgagagagvcv.gamed@gmail.com",
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
    expect.assertions(1);
    let body = {
        email: "dsadasdahmedmccccmmohamedcc.gamed@gmdsadasail.com",
        password: "memememesasacccmedsascdemseme",
        fullName: "ahmedmmeesasdcxzcccddcasdasdamdsaemes",
        username: "joesasadsaddasasdsaasddasdagvcxbsOsff7"
      };
      const x = await functions.createLawyer(body);
      const info =x.data.data;
      const y =await functions.getLawyers();
      //console.log(info);
     // console.log(y.data.data);
      
      const z= await functions.deleteLawyer(info._id);
      const f=await functions.getLawyers();

     console.log(y.data.data);
     console.log("___-______-______-_____--______");
     console.log(f.data.data);
   //  expect(y.data.data).toContain(info);
      expect(f.data.data).not.toContain(info);
    



      


});

