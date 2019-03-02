const uuid = require("uuid");

class Investor {
  constructor(
    email,
    password,
    fullName,
    type,
    gender,
    nationality,
    methodOfIdentification,
    identificationNumber,
    dateOfBirth,
    residenceAddress,
    telephoneNumber,
    fax
  ) {
    this.id = uuid.v4();
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.type = type;
    this.gender = gender;
    this.nationality = nationality;
    this.methodOfIdentification = methodOfIdentification;
    this.identificationNumber = identificationNumber;
    this.dateOfBirth = dateOfBirth;
    this.residenceAddress = residenceAddress;
    this.telephoneNumber = telephoneNumber;
    this.fax = fax;
  }
}

module.exports = Investor;
