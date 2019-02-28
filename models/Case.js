const uuid = require('uuid')
class Case {
    constructor(investorID,lawyerID ,companyType,regulatedLaw,legalFormOfCompany,companyNameArabic,companyNameEnglish,
    headOfficeGovernorate,headOfficeCity,headOfficeAddress,phoneNumber,fax,currencyUsedForCapital,capital,IDType,
    IDnumber,minimumCapitalLimit,managerName,managerType,managerGender,managerNationality,managerIDType,managerIDNumber,
    managerDateOfBirth,managerResidenceAdress,managerPositionInBoardOfDirectors) {
        this.caseID = uuid.v4();
        this.caseStatus = 'New';
        this.caseCreationDate = new Date();
        this.investorID = investorID;
        this.lawyerID = lawyerID;
        this.companyType = companyType;
        this.assigneeID = null;
        this.comments = [];
        this.contract = "";
        this.decision= "";
        this.regulatedLaw = regulatedLaw;
        this.legalFormOfCompany	= legalFormOfCompany;
	    this.companyNameArabic	= companyNameArabic;
	    this.companyNameEnglish	= companyNameEnglish;
	    this.headOfficeGovernorate = 	headOfficeGovernorate;
	    this.headOfficeCity	=	headOfficeCity;
	    this.headOfficeAddress = headOfficeAddress;
	    this.phoneNumber = phoneNumber ;
	    this.fax = fax;
	    this.currencyUsedForCapital	= currencyUsedForCapital;
	    this.capital =capital;
	    this.IDType	=IDType;
	    this.IDnumber	=IDnumber;
	    this.assignedReviewers =[];
	    this.assignedLawyers =[];
        this.minimumCapitalLimit = minimumCapitalLimit;
        this.managerName =managerName;
        this.managerType = managerType;
        this.managerGender = managerGender;
        this.managerNationality = managerNationality;
        this.managerIDType = managerIDType;
        this.managerIDNumber = managerIDNumber;
        this.managerDateOfBirth = managerDateOfBirth;
        this.managerResidenceAdress = managerResidenceAdress;
        this.managerPositionInBoardOfDirectors = managerPositionInBoardOfDirectors;
    };
};

module.exports = Case
