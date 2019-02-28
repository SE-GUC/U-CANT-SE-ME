const uuid = require('uuid')
class Case {
    constructor(investorID,lawyerID ,companyType) {
        this.caseID = uuid.v4();
        this.caseStatus = 'New';
        this.creationDate = new Date();
        this.investorID = investorID;
        this.lawyerID = lawyerID;
        this.companyType = companyType;
        this.assigneeID = null;
        this.comments = [];
    };
};

module.exports = Case
