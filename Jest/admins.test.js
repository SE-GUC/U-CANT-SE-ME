/**
 * @jest-environment node
 */

const admins = require('./admins')

  

test('Creating admin', async () => {
  expect.assertions(1)
 
 const body = {
   "username": "koko0000rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr00000000000000zzsas",
   "fullName": "eppppp",
   "password": "ssssss44"
 }
 
 const  createdAdmin  = await admins.createAdmin(body)
 const  AdminAfterCreation  = await admins.readAdmin(createdAdmin.data.data['_id']);
 adminID=createdAdmin.data.data['_id']
  return expect(createdAdmin.data.data).toEqual(AdminAfterCreation.data.data);

})

test("Get all admins", async () => {
    expect.assertions(0);
  
    // data is the response object from the server
    const data=await admins.default();
  
    console.log(data);
  });

  test('Get admin by ID', async() => {
    expect.assertions(1)
  
    const adminByID = await admins.readAdmin(adminID)
    return expect(adminID).toMatch(adminByID.data.data['_id'])
})


test('update admin', async () => {
  expect.assertions(1)

  const body = {
    "username": "yoyoyoyoyoyooyoyoyoyoyoyooyoyoyoyoyo4",
    "fullName": "eppppp",
    "password": "ssssss44"
  }

  const expectedAdminByID = await admins.readAdmin(adminID)
  expectedAdminByID.data.data.fullName=body.fullName
  expectedAdminByID.data.data.username=body.username
  expectedAdminByID.data.data.password=body.password

  await admins.updateAdmin(adminID,body)
  const adminByIDAfterUpdate = await admins.readAdmin(adminID)


  return expect(adminByIDAfterUpdate.data).toEqual(expectedAdminByID.data);

})



test('Delete admin', async () => {
  expect.assertions(1)

  const adminByID = await admins.readAdmin(adminID)
  await admins.deleteAdmin(adminID)
  const { data } = await admins.default();
  return expect(data).not.toContain(adminByID);

})



