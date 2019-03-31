/**
 * @jest-environment node
 */

const admins = require('./admins')
const encryption = require('../routes/api/utils/encryption')

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

test('Registering a Lawyer', async () => {
    jest.setTimeout(50000)
    const lawyer = 
    {
        username:"MantaLetaw2",
        password:"pasHere",
        fullName:"JoHbete CenAAA",
        email:"mantba@gmail.com"
    }
    const registeredLawyer= await admins.registerLawyer(lawyer)
    await admins.deleteLawyer(registeredLawyer.data.data._id)
    encryption.comparePassword(lawyer.password, registeredLawyer.data.data.password, function(err, isMatch){
        if(err)
            throw err
        return expect(isMatch).toBeTruthy()
    })
})

test('Registering a Reviewer', async () => {
    jest.setTimeout(50000)
    const Reviewer = 
    {
        username:"MantaRttb79",
        password:"passworderong",
        fullName:"Mantaveomo",
        email:"manlsdvverb579@noHomo.com"
    }
    const registeredReviewer= await admins.registerReviewer(Reviewer)
    await admins.deleteReviewer(registeredReviewer.data.data._id)    
    encryption.comparePassword(Reviewer.password, registeredReviewer.data.data.password, function(err, isMatch){
        if(err)
            throw err
        return expect(isMatch).toBeTruthy()
    })
})
