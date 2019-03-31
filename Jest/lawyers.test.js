/**
 * @jest-environment node
 */

const lawyers = require('./lawyers')

test('As a lawyer I should be able to login', async() => {
    // const loginInfo ;
    const lawyer = 
    {
        username:"yayayay1235",
        password:"pasHere",
        fullName:"JoHbete CenAAA",
        email:"yayayaya1235@gmail.com"
    }
    const registeredLawyer= await lawyers.registerLawyer(lawyer)
    const loginInfo =
    {
        email:"yayayaya1235@gmail.com",
        password:"pasHere"
    }
    const loginResult = await lawyers.login(loginInfo)
    expect(loginResult.data.length).toBeGreaterThan(0)
    await lawyers.deleteLawyer(registeredLawyer.data.data._id)
})  