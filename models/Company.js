const uuid = require("uuid");
class Company {
  constructor(
    socialInsuranceNumber,
    investorID,
    companyName,
    companyType,
    companyStatus,
    dateOfCreation,
    caseID
  ) {
    this.companyID = uuid.v4();
    this.socialInsuranceNumber = socialInsuranceNumber;
    this.investorID = investorID;
    this.companyName = companyName;
    this.companyType = companyType;
    this.companyStatus = companyStatus;
    this.dateOfCreation = dateOfCreation;
    this.caseID = caseID;
  }
}
module.exports = Company;
