/**
 * @jest-environment node
 */

const investors = require("./investors");
const encryption = require("../routes/api/utils/encryption");

//READ
test("Get all investors test", async () => {
  expect.assertions(1);

  //data is the rresponse object from the server
  const res = await investors.readAllInvestors();

  expect(res.status).toBe(200);
});

//CREATE
test("Create an investor initial test", async () => {
  expect.assertions(2);

  //The body of the request
  const body = {
    email: "CreatedHossam1@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  const res = await investors.createInvestor(body);

  const allInvestors = await investors.readAllInvestors();

  await investors.deleteInvestor(res.data._id);

  expect(allInvestors.data).toContainEqual(res.data);

  delete res.data._id;
  delete res.data.__v;

  expect(res.data).toEqual(body);
});

//CREATE
test("Create an investor duplicate email test", async () => {
  expect.assertions(1);

  //The body of the request
  const body = {
    email: "gamed.gamed@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  const res = await investors.createInvestor(body);

  try {
    await investors.createInvestor(body);
    expect(0).toBe(1); //If no status 400 test must fail
  } catch (err) {}
  await investors.deleteInvestor(res.data._id);
  expect(0).toBe(0); //Else test passes
});

//CREATE
test("Create an investor invalid data test", async () => {
  expect.assertions(1);

  //The body of the request
  const body = {
    email: "CreatedHossam3@gmail.com",
    password: "213",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1231"
  };
  try {
    await investors.createInvestor(body);
    expect(0).toBe(1); //If no status 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

//READ
test("Get an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  const body = {
    email: "readInvestorTest4@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  const res = await investors.createInvestor(body);

  const createdInvestor = await investors.readInvestor(res.data._id);

  await investors.deleteInvestor(res.data._id);

  expect(res.data).toEqual(createdInvestor.data);
});

//READ
test("Get an investor that doesn't exist test", async () => {
  expect.assertions(1);

  try {
    await investors.readInvestor(123);
    expect(0).toBe(1); //If no status 404 or 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

// UPDATE
test("Update an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  let body = {
    email: "hossamelUpdated1@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  //Create the Investor
  let res = await investors.createInvestor(body);

  let createdInvestor = res.data;

  createdInvestor.fullName = "Updated Name";
  createdInvestor.fax = "71234234";

  body = {
    fullName: "Updated Name",
    fax: "71234234"
  };

  //Update the newly created investor and get it
  await investors.updateInvestor(createdInvestor._id, body);

  const { data } = await investors.readInvestor(createdInvestor._id);

  //Delete the newly created investor
  await investors.deleteInvestor(createdInvestor._id);

  //Check if it was updated
  expect(data).toEqual(createdInvestor);
});

//UPDATE
test("Update an investor with invalid data test", async () => {
  expect.assertions(1);

  let body = {
    email: "hossamelUpdated2@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  let res = await investors.createInvestor(body);
  let createdInvestor = res.data;

  body = {
    fullName: "Updated Name",
    fax: "1231"
  };

  try {
    await investors.updateInvestor(123, body);
    await investors.deleteInvestor(createdInvestor._id);
    expect(0).toBe(1); //If no status 400 test must fail
  } catch (err) {}
  await investors.deleteInvestor(createdInvestor._id);
  expect(0).toBe(0); //Else test passes
});

//UPDATE
test("Update an investor that doesn't exist test", async () => {
  expect.assertions(1);

  let body = {
    email: "hossamelUpdated3@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  try {
    await investors.updateInvestor(123, body);
    expect(0).toBe(1); //If no status 404 or 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

//DELETE
test("Delete an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  let body = {
    email: "hossamEldeleted1@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };

  let res = await investors.createInvestor(body);

  let createdInvestor = res.data;

  await investors.deleteInvestor(createdInvestor._id);

  const { data } = await investors.readAllInvestors();

  expect(data).not.toContain(createdInvestor);
});

//DELETE
test("Delete an investor that doesn't exist test", async () => {
  expect.assertions(1);
  try {
    await investors.readInvestor(123);
    expect(0).toBe(1); //If no status 404 or 400 test must fail
  } catch (err) {}
  expect(0).toBe(0); //Else test passes
});

let createdEmail = "";
let createdPassword = "";
let investorId = "";
let caseId = "";

test("Create All Dependencies", async () => {
  const investor = {
    email: "moe@moe.moe",
    password: "dontusethispassword",
    fullName: "MoeMoeMoe",
    type: "CEO",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1997-12-15T22:00:00.000Z",
    residenceAddress: "Rehab City",
    telephoneNumber: "01007063067",
    fax: "123456789"
  };
  createdInvestor = await investors.registerInvestor(investor);
  createdEmail = createdInvestor.data.data.email;
  createdPassword = investor.password;
  investorId = createdInvestor.data.data._id;
});

test("Registering an investor", async () => {
  const investor = {
    email: "moemoemoe5@faegmail.com",
    password: "12345678fea",
    fullName: "bala ibn bafeala abo",
    type: "cfea",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  };
  expect.assertions(0);
  const registeredInvestor = await investors.registerInvestor(investor);
  await investors.deleteInvestor(registeredInvestor.data.data._id);
  encryption.comparePassword(
    investor.password,
    registeredInvestor.data.data.password,
    function(err, isMatch) {
      if (err) throw err;
      return expect(isMatch).toBeTruthy();
    }
  );
});

test("As an investor I should be able to login", async () => {
  const loginInfo = {
    email: createdEmail,
    password: createdPassword
  };
  const loginResult = await investors.login(loginInfo);
  return expect(loginResult.data.length).toBeGreaterThan(0);
});

test("Delete All Dependencies", async () => {
  await investors.deleteInvestor(investorId);
});

test("As an investor I should be view my fees", async () => {
  expect.assertions(3);
  let body = {
    email: "hoshos@gmail.com",
    password: "12345678",
    fullName: "Abc Ibn Xyz",
    type: "a",
    gender: "Male",
    nationality: "Egyptian",
    methodOfIdentification: "National Card",
    identificationNumber: "12233344445555",
    dateOfBirth: "1990-12-17T22:00:00.000Z",
    residenceAddress: "13th Mogama3 el Tahrir",
    telephoneNumber: "00201009913457",
    fax: "1234567"
  }
  console.log("Here 1");

  const investor = await investors.createInvestor(body);
  console.log("Here 1");
  const cas = await investors.createCase(investor.data._id);
  console.log("Here 1");
  let res = await investors.viewMyFees(investor.data._id);
  
  expect(res).toBe("you do not have any accepted company requests");

  await investors.changeStatus(cas._id);
  res = await investors.viewMyFees(investor.data._id);
  await investors.deleteCase(cas._id);
  await investors.deleteInvestor(investor.data._id);

  const name = res[0].companyName;
  const fees = res[0].fees;
  expect(fees).not.toBe(0);
  expect(name).toEqual("DONTD4536ELETE");
});
