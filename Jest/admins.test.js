/**
 * @jest-environment node
 */

const admins = require('./admins')
const encryption = require('../routes/api/utils/encryption')

test('Registering a Lawyer', async () => {
    jest.setTimeout(50000)
    const lawyer = 
    {
        username:"Manta1453Letaw2",
        password:"pasHere",
        fullName:"JoHbete CenAAA",
        email:"mantb1a@gmail.com"
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
        username:"MantaR3452t1tb79",
        password:"passworderong",
        fullName:"Mantaveomo",
        email:"manlsdvv1erb579@noHomo.com"
    }
    const registeredReviewer= await admins.registerReviewer(Reviewer)
    await admins.deleteReviewer(registeredReviewer.data.data._id)    
    encryption.comparePassword(Reviewer.password, registeredReviewer.data.data.password, function(err, isMatch){
        if(err)
            throw err
        return expect(isMatch).toBeTruthy()
    })
})

test('get last lawyer worked on a case', async () => {
    expect.assertions(2)
    bodyLawyer = {
        "username": "4ahmefddfyvoedfvsdussesf9d8f6",
        "password": "4ahmefddeflvasdfdzzou6fd",
        "fullName": "6youssef mohamed joez",
        "email": "6youssefdf98f6fsfvdd@gmail.com"
    }
    const lawyer = await admins.createLawyer(bodyLawyer)
    const lawyerId = lawyer.data.data['_id']

    console.log(lawyer)
    const bodyInvestor = {
        "email": "40ddysddafsbfdssdfdvcf@gmail.com",
        "password": "4161dsdf23ffsfsddsvf4df567y",
        "fullName": "416Afdhsdbcffs sdssvfIcdfbn Xyz",
        "type": "a",
        "gender": "Male",
        "nationality": "Egyptian",
        "methodOfIdentification": "National Card",
        "identificationNumber": "12233344445555",
        "dateOfBirth": "1990-12-17T22:00:00.000Z",
        "residenceAddress": "13th Mogama3 el Tahrir",
        "telephoneNumber": "00201009913457",
        "fax": "1234567"
    }

    const createdInvestor = await admins.createInvestor(bodyInvestor);
    
    
    console.log(lawyerId)
    console.log(createdInvestor.data['_id'])

    const body = {
        "form": {
            "companyType": "SPC",
            "regulatedLaw": "lll",
            "legalFormOfCompany": "51sdvqdgsvfqdssmdcesdv",
            "companyNameArabic": "51qevsdqhgsdfecdcdsvfffdffsdedkddscsfdtsgdsdvqdvq",
            "companyNameEnglish": "51qdvhsddfsgdcqddddvdfdfseskcfdddfsstgddddvsssqdvqdv",
            "headOfficeGovernorate": "qdvsfqdmvqsdvtgqdv",
            "headOfficeCity": "asasdastgsdsdsdsdd",
            "headOfficeAddress": "qwdvqdvqwdvqwdv",
            "phoneNumber": "121212122121",
            "fax": "1234567",
            "currencyUsedForCapital": "qdvqedvqdvqdv",
            "capital": 100
        },
        "caseStatus": "Rejected",
        "assignedLawyerId": lawyerId,
        "creatorInvestorId": createdInvestor.data['_id']

    }

    const createdCase = await admins.createCase(body)

   const lastLawyer = await admins.getLastLawyer(createdCase.data.data._id);  
   console.log(lastLawyer.data)
      
 //   console.log(createdCase.data.data._id)

    await admins.deleteCase(createdCase.data.data._id)
    await admins.deleteLawyer(lawyerId)
    await admins.deleteInvestor(createdInvestor.data['_id'])    
    expect(lastLawyer.data).toEqual({ lawyerName: '6youssef mohamed joez' });
})  
