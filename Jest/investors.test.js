/**
 * @jest-environment node
 */

const investors = require("./investors");

//READ
test("Get all investors initial test", async () => {
  expect.assertions(0);

  //data is the rresponse object from the server
  const { data } = await investors.readAllInvestors();

  console.log(data);
});

//CREATE
test("Create an investor initial test", async () => {
  expect.assertions(0);

  //The body of the request
  const body = {
    email: "meshabc@gmail.com",
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

  console.log(res);

  await investors.deleteInvestor(res.data._id);
});

// UPDATE
test("Update an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  let body = {
    email: "hossamelUpdated@gmail.com",
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

//DELETE
test("Delete an investor initial test", async () => {
  expect.assertions(1);

  //The body of the request
  let body = {
    email: "hossamEldeleted@gmail.com",
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

test("As an investor I should be able to login", async () => {
  const loginInfo = {
    email: "scrummaster@gmail.com",
    password: "12345678fea"
  };
  const loginResult = await investors.login(loginInfo);
  return expect(loginResult.data.length).toBeGreaterThan(0);
});
