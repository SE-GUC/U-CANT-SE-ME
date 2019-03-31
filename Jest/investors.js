const axios = require("axios");

const investors = {
  default: async () => {
    return await axios.get("http://localhost:3000/api/investors/");
  },
  registerInvestor: async req => {
    return await axios.post(
      "http://localhost:3000/api/investors/register",
      req
    );
  },
  viewComments: async (investorID, caseID) => {
    return await axios.get(
      `http://localhost:3000/api/investors/lawyerComments/${investorID}/${caseID}`
    );
  },
  readAllInvestors: async () => {
    return await axios.get("http://localhost:3000/api/investors");
  },
  readInvestor: async id => {
    return await axios.get(`http://localhost:3000/api/investors/${id}`);
  },
  createInvestor: async (body) => {
    return await axios.post("http://localhost:3000/api/investors", body);
  },
  updateInvestor: async (id, body) => {
    return await axios.put(`http://localhost:3000/api/investors/${id}`, body);
  },
  deleteInvestor: async id => {
    return await axios.delete(`http://localhost:3000/api/investors/${id}`);
  },
  login: async loginInfo => {
    return await axios.post(
      "http://localhost:3000/api/investors/login",
      loginInfo
    );
  },
  updateCase: async (id, req) => {
    return await axios.put(`http://localhost:3000/api/cases/update/${id}`, req);
  },
  viewMyFees: async id => {
    const ret = await axios.get(
      `http://localhost:3000/api/investors/viewMyFees/${id}`
    );
    return ret.data.response;
  },
  createCase: async id => {
    let req = {
      form: {
        companyType: "SPC",
        regulatedLaw: "72",
        legalFormOfCompany: "DONTDELETE",
        companyNameArabic: "DONTDE352LETE",
        companyNameEnglish: "DONTD4536ELETE",
        headOfficeGovernorate: "DONTDELETE",
        headOfficeCity: "DONTDELETE",
        headOfficeAddress: "DONTDELETE",
        phoneNumber: "121212122121",
        fax: "1234567",
        currencyUsedForCapital: "DONTDELETE",
        capital: 100
      },
      caseStatus: "WaitingForLawyer",

      creatorInvestorId: id
    };
    const cas = await axios.post("http://localhost:3000/api/cases/", req);

    return cas.data.data;
  },

  deleteCase: async id => {
    return await axios.delete(`http://localhost:3000/api/cases/${id}`);
  },
  changeStatus: async id => {
    let req = {
      form: {
        companyType: "SPC",
        regulatedLaw: "72",
        legalFormOfCompany: "DONTDELETE",
        headOfficeGovernorate: "DONTDELETE",
        headOfficeCity: "DONTDELETE",
        headOfficeAddress: "DONTDELETE",
        phoneNumber: "121212122121",
        fax: "1234567",
        currencyUsedForCapital: "DONTDELETE",
        capital: 100
      },
      caseStatus: "Accepted"
    };
    await axios.put(`http://localhost:3000/api/cases/update/${id}`, req);
  }
};

module.exports = investors;
