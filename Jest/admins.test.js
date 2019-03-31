/**
 * @jest-environment node
 */

const admins = require('./admins')

test('As an admin I should be able to login', async() => {
    const createAdmin={
        username:"YahiaBadr3",
        fullName:"Yahia Hisham",
        password:"yaya1234"
    };
    const createdAdmin = admins.createAdmin(createAdmin);
    const loginInfo={
        username:"YahiaBadr3",
        password:"yaya1234"
    };
    const loginResult = await admins.login(loginInfo)
    expect(loginResult.data.data.length).toBeGreaterThan(0);
    // console.log(admin.headers)
    // console.log("----------------------")
    // console.log(admin)
    // await admins.deleteAdmin(createdAdmin.data.data["_id"]);
})  