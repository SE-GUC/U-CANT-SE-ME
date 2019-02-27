class Reviewer{
    constructor(id,fullName,gender,dateOfBitrh,ressidenceAddress,telephoneNumber,fax,email) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.dateOfBitrh = dateOfBitrh;
	this.ressidenceAddress = ressidenceAddress;
        this.telephoneNumber = telephoneNumber;
        this.fax = fax;
        this.email = email;
    };
}

module.exports = Reviewer