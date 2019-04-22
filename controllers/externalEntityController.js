const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Case = require("../models/Case");
const investors = require("../models/Investor");
const ExternalEntity = require("../models/ExternalEntity");
const validator = require("../validations/externalEntityValidations");
const mongoValidator = require("validator");
const pdf = require("html-pdf");
const axios = require("axios");
const Investor = require("../models/Investor");

// GET
exports.getAllExternalEntities = async function(req, res) {
  const externalEntities = await ExternalEntity.find();
  res.send({ data: externalEntities });
};

// GET Specific External Entity
exports.getSpecificExternalEntity = async function(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const requestedExtEntity = await ExternalEntity.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    if (requestedExtEntity === null)
      return res.status(404).send("External Entity not Found");
    res.send({ data: requestedExtEntity });
  } catch {
    res.send({ error: "An error has occured" });
  }
};

// POST
exports.createExternalEntity = async function(req, res) {
  try {
    const name = req.body.name;
    const url = req.body.url;
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    let checkNameExists = await ExternalEntity.where("name", name);
    let checkURLExists = await ExternalEntity.where("url", url);
    if (checkNameExists.length > 0)
      return res
        .status(400)
        .send({ error: "External Entity Name is already taken" });
    if (checkURLExists.length > 0)
      return res
        .status(400)
        .send({ error: "External Entity url is already taken" });
    const newExtEntity = await ExternalEntity.create(req.body);
    res.send({
      msg: "External Entity was created successfully",
      data: newExtEntity
    });
  } catch {
    res.send({ error: "An error has occured" });
  }
};

// PUT
exports.updateExternalEntity = async function(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const toBeUpdatedExtEntity = await ExternalEntity.findById(req.params.id);
    if (toBeUpdatedExtEntity === null)
      return res.status(404).send({ error: "External Entity not Found" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    if (name) {
      let checkNameExists = await ExternalEntity.where("name", name);
      if (checkNameExists.length > 0)
        return res
          .status(400)
          .send({ error: "External Entity Name is already taken" });
      toBeUpdatedExtEntity.name = name;
    }
    if (description) {
      toBeUpdatedExtEntity.description = description;
    }
    if (url) {
      let checkURLExists = await ExternalEntity.where("url", url);
      if (checkURLExists.length > 0)
        return res
          .status(400)
          .send({ error: "External Entity url is already taken" });
      toBeUpdatedExtEntity.url = url;
    }
    await ExternalEntity.findByIdAndUpdate(req.params.id, toBeUpdatedExtEntity);
    res.send({
      msg: "External Entity was updated successfully",
      data: toBeUpdatedExtEntity
    });
  } catch {
    res.send({ error: "An error has occured" });
  }
};

exports.deleteExternalEntity = async function(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const deletedExtEntity = await ExternalEntity.findByIdAndDelete(
      req.params.id
    );
    if (deletedExtEntity === null)
      return res.status(404).send({ error: "External Entity not Found" });
    return res.send({
      msg: "External Entity deleted successfully",
      data: deletedExtEntity
    });
  } catch {
    res.send({ error: "An error has occured" });
  }
};

exports.notifyEntities = async function(caseId, caseType) {
  const externalEntities = await ExternalEntity.find();
  const suffix = caseType === "SPC" ? "pdf" : "create-SSCpdf";
  const url =
    "http://localhost:5000/api/externalEntities/" + suffix + "/" + caseId;
  const body = { url: url };
  for (let i = 0; i < externalEntities.length; i++) {
    let entity = externalEntities[i];
    let postURL = entity.url;
    await axios.post(postURL, body);
  }
};

exports.postSSCPDF = async function(req, res) {
  var caseId = req.body.caseId;
  if (!mongoValidator.isMongoId(caseId))
    return res.status(404).send({ error: "Invalid ID" });
  const oneCase = await Case.findById(caseId);
  if (!oneCase)
    return res.status(400).send({ error: "Case entered not found" });
  var companyType = oneCase.companyType;
  if (companyType !== "SSC") {
    return res.status(404).send({ error: "Wrong CompanyType" });
  }

  var html = await makingHtmlForSSC(caseId);
  var allHtml = `<!doctype html><html><div>` + html + ` </div></html>`;

  pdf.create(allHtml, {}).toFile(caseId + ".pdf", err => {
    if (err) {
    }
    res.send(Promise.resolve());
  });
};

exports.getSSCPDF = async function(req, res) {
  var caseId = req.params.id;
  if (!mongoValidator.isMongoId(caseId))
    return res.status(404).send({ error: "Invalid ID" });
  const oneCase = await Case.findById(caseId);
  if (!oneCase)
    return res.status(400).send({ error: "Case entered not found" });
  var companyType = oneCase.companyType;
  if (companyType !== "SSC") {
    return res.status(404).send({ error: "Wrong CompanyType" });
  }

  var html = await makingHtmlForSSC(caseId);
  var allHtml = `<!doctype html><html><div>` + html + ` </div></html>`;
  pdf.create(allHtml, {}).toFile(caseId + ".pdf", (err, Response) => {
    if (err) {
      return console.log("error");
    }
    res.sendFile(Response.filename);
  });
};

exports.viewSSCPDF = async function(req, res) {
  var caseId = req.params.id;
  if (!mongoValidator.isMongoId(caseId))
    return res.status(404).send({ error: "Invalid ID" });
  const oneCase = await Case.findById(caseId);
  if (!oneCase) return res.status(400).send({ error: "Case entered not found" });
  var companyType = oneCase.companyType;
  if (companyType !== "SSC") {
    return res.status(404).send({ error: "Wrong Company Type" });
  }
  var html = await makingHtmlForSSC(caseId);
  var allHtml = `<!doctype html><html><div>` + html + ` </div></html>`;
  res.send(allHtml);
};

makingHtmlForSSC = async function(caseId) {
  var form = await Case.findById(mongoose.Types.ObjectId(caseId));
  var companyName = form.form.companyNameArabic;
  var investor = await investors.findById(
    mongoose.Types.ObjectId(form.creatorInvestorId)
  );
  var investorNationality = investor.nationality;
  var investorFullName = investor.fullName;
  var investorDateOfBirth = investor.dateOfBirth;
  var investorMethodOfIdentification = investor.methodOfIdentification;
  var investorIdentificationNumber = investor.identificationNumber;
  var investorResidenceAddress = investor.residenceAddress;
  var headOfficeGovernorate = form.form.headOfficeGovernorate;
  var currencyUsedForCapital = form.form.currencyUsedForCapital;
  var capital = form.form.capital;
  var oneManagerGender = "";
  if (form.managers.length === 1) {
    oneManagerGender = form.managers[0].managerGender;
  }
  var band0 = "";
  var band8 = "";
  if (form.form.regulatedLaw === "159") {
    band0 =
      "<p>" +
      "في إطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اس";
    band0 += companyName;
    band0 +=
      " وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ، حيث قامت بإجراء المراجعة اللازمة له .";
    band0 +=
      " ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد (89)، (162)، (163)، (164) من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص الواحد الصادر بالقانون رقم 159 لسنة 1981 ، ويشار إليه فيما بعد باسم قانون الشركات ، ما لم يكن قد رُد إليه اعتباره ، وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون .";
    band0 +=
      "  وقد أقر المؤسس بالالتزام بأحكام هذا النظام الأساسي وأحكام القانون المصري، وبصفة خاصة قانون الشركات المشار إليه ولائحته التنفيذية ." +
      "</p>";
    band8 =
      "<p>" +
      "تسري على الشركة أحكام قانون الشركات ولائحته التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام ." +
      "</p>";
  }
  if (form.form.regulatedLaw === "72") {
    band0 =
      "<p>" +
      "في إطار أحكام القانون المصري وافق الموقع على هذا النظام الأساسي على تأسيس شركة شخص واحد تحت اسم ";
    band0 += companyName;
    band0 +=
      "، وتأسيساً على ذلك تقدم بهذا النظام الأساسي إلى الهيئة العامة للاستثمار والمناطق الحرة ، حيث قامت بإجراء المراجعة اللازمة له .";
    band0 =
      "ويقر الموقع على هذا النظام الأساسي بأنه قد توافرت فيه الأهلية اللازمة لتأسيس شركة شخص واحد ، وبأنه لم يسبق صدور أحكام عليه بعقوبة جناية أو جنحة مخلة بالشرف أو الأمانة أو بعقوبة من العقوبات المُشار إليها في المواد (89)، (162)، (163)، (164) من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة وشركات الشخص الواحد الصادر بالقانون رقم 159 لسنة 1981 ، ويشار إليه فيما بعد باسم قانون الشركات، ما لم يكن قد رُد إليه اعتباره ، وأنه غير محظور عليه تأسيس شركات طبقاً لأحكام القانون .";
    band0 +=
      " كما يقر أنه لم يقدم أو يساهم أو يستخدم في إنشاء أو تأسيس أو إقامة مشروع الاستثمار المتمتع بالحافز أياً من الأصول المادية لشركة أو منشأة قائمة وقت العمل بأحكام هذا القانون أو قام بتصفية تلك الشركة أو المنشأة خلال المدة المبينة بالبند (2) من المادة (12) من اللائحة التنفيذية لقانون الاستثمار بغرض إنشاء مشروع استثماري جديد يتمتع بالحوافز الخاصة المشار إليها ، ويترتب على مخالفة ذلك سقوط التمتع بالحافز المشار إليه والتزام الشركة بسداد جميع المستحقات الضريبية .";
    band0 +=
      " وقد وافق على تأسيس شركة شخص واحد مصرية الجنسية وفقاً لأحكام القوانين النافذة وعلى وجه الخصوص قانون الشركات ولائحته التنفيذية وقانون الاستثمار الصادر بالقانون رقم 72 لسنة 2017 ، ويشار إليه فيما بعد باسم قانون الاستثمار ولائحته التنفيذية وأحكام هذا النظام الأساسي." +
      "</p>";
    band8 =
      "<p>" +
      "تسري على الشركة أحكام قانون الشركات وقانون الاستثمار ولائحتيهما التنفيذية فيما لم يرد بشأنه نص خاص في هذا النظام " +
      "</p>";
  }
  var band1 =
    "<p>" +
    " شركة شخص واحد ذات مسئولية محدودة" +
    companyName +
    ":" +
    "اسم الشركة" +
    "</p>";
  var band2 = "<p>" + "بيانات مؤسس الشركة:";
  band2 += investorFullName + " ";
  band2 += investorNationality + " ";
  band2 += investorDateOfBirth + " ";
  band2 += investorMethodOfIdentification + " ";
  band2 += investorIdentificationNumber + " ";
  band2 += investorResidenceAddress + "</p>";

  var band3 =
    "<p>" +
    "يكون المركز الرئيسى لإدارة الشركة ومحلها القانوني في العنوان الآتى : ";
  band3 += headOfficeGovernorate;
  band3 +=
    "مع مراعاة القانون رقم 14 لسنة 2012 بشأن التنمية المتكاملة في شبه جزيرة سيناء ، لمدير الشركة إنشاء فروع أو وكالات لها داخل جمهورية مصر العربية أو خارجها ، وللشركة أن تقرر نقل المركز الرئيسي لها إلى أي مدينة أخرى داخل جمهورية مصر العربية بموافقة مؤسس أو مالك الشركة .  " +
    "</p>";

  var band10 =
    "<p>" +
    "قام مؤسس الشركة بشخصه باتخاذ كافة الإجراءات اللازمة في هذا الشأن .";
  band10 +=
    "وتلتزم الشركة بأداء المصروفات والنفقات والأجور والتكاليف التي تم انفاقها بسبب تأسيس الشركة ، وذلك خصماً من حساب المصروفات العامة." +
    "</p>";

  var band9 = "</p>" + "ينشر هذا النظام طبقا لأحكام القانون ." + "</p>";
  var band6 = "";
  if (currencyUsedForCapital === "EGP") {
    band6 =
      "<p>" +
      "لمؤسس أو مالك الشركة أن يقرر تخفيض رأس مال الشركة لأي سبب ، سواء عن طريق إنقاص عدد الحصص أو تخفيض ";
    band6 +=
      "القيمة الاسمية لكل منها ، وفقاً لأحكام قانون الشركات ولائحته التنفيذية .";
    band6 += "ولا يجوز تخفيض رأس المال إلى أقل من خمسين ألف جنيه ." + "</p>";
  } else {
    band6 =
      "<p>" +
      "لمؤسس أو مالك الشركة أن يقرر تخفيض رأس مال الشركة لأي سبب ، سواء عن طريق إنقاص عدد الحصص أو تخفيض ";
    band6 +=
      "القيمة الاسمية لكل منها ، وفقاً لأحكام قانون الشركات ولائحته التنفيذية .";
    band6 +=
      "ولا يجوز تخفيض رأس المال إلى أقل من ما يعادل خمسين ألف جنيه ." + "</p>";
  }

  var band5 =
    "<p>" +
    "يجوز زيادة رأس مال الشركة على دفعة واحدة أو أكثر ، سواء بإصدار حصص جديدة أو بتحويل المال الاحتياطي إلى حصص ، وذلك بقرار من مؤسس أو مالك الشركة وطبقا للأحكام المنصوص عليها في قانون الشركات. " +
    "</p>";
  var band4 = "<p>" + "حدد رأسمال الشركة بمبلغ";
  band4 +=
    capital +
    "(" +
    currencyUsedForCapital +
    ")" +
    "، وقد أودع رأسمال الشركة بالكامل في البنك بموجب الشهادة المرفقة." +
    "</p>";

  var html1 = "<table><tr>";
  // Loop through array and add table cells
  for (var i = 0; i < form.managers.length; i++) {
    html1 += "<td>" + form.managers[i].managerName + "</td>";
    html1 += "<td>" + form.managers[i].managerNationality + "</td>";
    html1 += "<td>" + form.managers[i].managerDateOfBirth + "</td>";
    html1 += "<td>" + form.managers[i].managerIdNumber + "</td>";
    html1 += "<td>" + form.managers[i].managerResidenceAddress + "</td>";
    // Break into next row
    html1 += "</tr><tr>";
  }
  html1 += "</tr></table>";

  var band7 = "";
  if (form.managers.length === 1 && oneManagerGender == "female") {
    band7 =
      "<p>" +
      " يتولى إدارة الشركة مؤسس الشركة أو مدير أو أكثر يعينهم مؤسس الشركة على النحو التالي:" +
      "</p>";
    band7 += html1;
    band7 +=
      "<p>" +
      " و تباشر المديرة/ المديرات (حسب عدد المديرين) وظائفها / وظائفهم  (حسب عدد المديرين)  لمدة غير محدد";
    band7 +=
      "ويسرى في شأن مدير الشركة حكم المادة (89) من قانون الشركات ، مع مراعاة ألا يكون غير محظور عليه إدارة الشركات طبقاً لأحكام القانون .  ";
    band7 +=
      "ولا يجوز للمدير أن يتولى إدارة شركة أخرى أياً كان نوعها إذا كانت تعمل في ذات النشاط الذي تزاوله الشركة أو أحد فروعها ، كما لا يجوز له أن يتعاقد مع الشركة التي يتولى إدارتها لحسابه أو لحساب غيره ، أو يمارس لحساب الغير نشاطاً من نوع النشاط الذى تزاوله الشركة . " +
      "</p>";
  } else {
    if (form.managers.length === 1 && oneManagerGender == "male") {
      band7 =
        "<p>" +
        " يتولى إدارة الشركة مؤسس الشركة أو مدير أو أكثر يعينهم مؤسس الشركة على النحو التالي:" +
        "</p>";
      band7 += html1;
      band7 +=
        "<p>" +
        "و يباشر المدير/ المديرون (حسب عدد المديرين) وظائفه / وظائفهم  (حسب عدد المديرين) لمدة غير محددة ويسرى في شأن مدير الشركة حكم المادة (89) من قانون الشركات ، مع مراعاة ألا يكون غير محظور عليه إدارة الشركات طبقاً لأحكام القانون . ولا يجوز للمدير أن يتولى إدارة شركة أخرى أياً كان نوعها إذا كانت تعمل في ذات النشاط الذي تزاوله الشركة أو أحد فروعها ، كما لا يجوز له أن يتعاقد مع الشركة التي يتولى إدارتها لحسابه أو لحساب غيره ، أو يمارس لحساب الغير نشاطاً من نوع النشاط الذى تزاوله الشركة ." +
        "</p>";
    } else {
      band7 =
        "<p>" +
        " يتولى إدارة الشركة مؤسس الشركة أو مدير أو أكثر يعينهم مؤسس الشركة على النحو التالي:" +
        "</p>";
      band7 += html1;
      band7 +=
        "<p>" +
        "و يباشر المدير/ المديرون (حسب عدد المديرين) وظائفه / وظائفهم  (حسب عدد المديرين) لمدة غير محددة ويسرى في شأن مدير الشركة حكم المادة (89) من قانون الشركات ، مع مراعاة ألا يكون غير محظور عليه إدارة الشركات طبقاً لأحكام القانون . ولا يجوز للمدير أن يتولى إدارة شركة أخرى أياً كان نوعها إذا كانت تعمل في ذات النشاط الذي تزاوله الشركة أو أحد فروعها ، كما لا يجوز له أن يتعاقد مع الشركة التي يتولى إدارتها لحسابه أو لحساب غيره ، أو يمارس لحساب الغير نشاطاً من نوع النشاط الذى تزاوله الشركة ." +
        "</p>";
    }
  }
  var all =
    "" +
    band0 +
    band1 +
    band2 +
    band3 +
    band4 +
    band5 +
    band6 +
    band7 +
    band8 +
    band9 +
    band10;
  return all;
};
// SPC
exports.generateSPCPdf = async function(req, res) {
  const caseId = req.params.id;
  if (!mongoValidator.isMongoId(caseId))
    return res.status(400).send({ error: "Invalid Case Id" });
  const cas = await Case.findById(caseId);
  if (!cas) return res.status(400).send({ error: "Case entered not found" });
  const html = await getHTMLForSPC(cas);
  const fileName = "decision" + caseId + ".pdf";
  pdf.create(html, {}).toFile(fileName, (err, response) => {
    if (err) {
      return console.log("error");
    }

    res.sendFile(response.filename);
  });
};

exports.viewSPCHtml = async function(req, res) {
  const caseId = req.params.id;
  if (!mongoValidator.isMongoId(caseId))
    return res.status(400).send({ error: "Invalid Case Id" });
  const cas = await Case.findById(caseId);
  if (!cas) return res.status(400).send({ error: "Case entered not found" });
  const html = await getHTMLForSPC(cas);
  res.send(html);
};
getHTMLForSPC = async function(cas) {
  // const regulatedLaw = cas.form.regulatedLaw;
  const companyNameArabic = cas.form.companyNameArabic;
  const creatorInvestorId = cas.creatorInvestorId;
  const investor = await Investor.findById(creatorInvestorId);
  const investorName = investor.fullName;
  const nationality = investor.nationality;
  const capital = cas.form.capital;
  const currency = cas.form.currencyUsedForCapital;

  const html = toSPCHTML({
    investorName: investorName,
    companyNameArabic: companyNameArabic,
    nationality: nationality,
    capital: capital,
    currency: currency
  });
  return html;
};

toSPCHTML = function(data) {
  return `
  <!doctype html>
  <html>
  <div>
    <h3>122:رقم
    <h3> التاريخ
    <h1> السید الأستاذ / مدیر مكتب سجل تجارى الاستثمار
    <h1> تحیة طیبة ،،،،،،
    <h1> hey:${data.investorName}</h1>
    <p>
    یرجى التكرم بالإحاطة بأن قانون الاستثمار الصادر بالقانون رقم ٧٢ لسنة ٢٠١٧ ولائحتة التنفیذیة
    قد سمحا بوجود المنشأة الفردیة كأحد الأشكال القانونیة التي یمكن أن تزاول الأغراض المنصوص علیھا فى قانون
    الاستثمار ولائحتھ التنفیذیة.
    </p>
    علما بأن بیاناتھا الرئیسیة على النحو التالى :-
    
    اسم المنشأة :${data.companyNameArabic} لصاحبھا : ${data.investorName}
    اسم صاحب المنشأة : ${data.investorName} (جنسیتھ : ${data.nationality}
     ${data.capital}:رأس المال
     مع مراعاة أحكام القوانین واللوائح والقرارات الساریة وعلى المنشأة الحصول على كافة التراخیص اللازمة
     لمباشرة نشاطھا .
     المركز الرئیسي : ٢٦٠ شارع جسر السویس - القاھره
     وحیث أن الھیئة العامة للاستثمار والمناطق الحرة قد وافقت على إقامة المنشأة الفردیة الموضح بیاناتھا أعلاه
     بالنظر لأن غرضھا یندرج ضمن الأغراض المحددة فى قانون الاستثمار ولائحتھ التنفیذیة، لذلك یرجى التفضل بقید المنشأة الفردیة
     المشار إلیھا فى السجل التجاري طرف مكتبكم الموقر ، كما نرجو من سیادتكم موافاتنا بما یفید قیدھا فى السجل
     التجارى طرف مكتبكم .
     یلتزم صاحب المنشاة بتقدیم سند حیازة المكان الذى ستزاول فیھ المنشأة نشاطھا خلال عام من تاریخ القید فى السجل التجارى , و فى حالة عدم الالتزام جاز للھیئة
     اتخاذ إجراءات محو قید المنشأة من السجل التجارى.
     لا ینشىء ھذا الكتاب أي حق للمنشأة في مزاولة غرضھا إلا بعد الحصول على التراخیص اللازمة لمزاولة غرضھا من الجھات المختصة .
     ینشر ھذا الخطاب فى صحیفة الاستثمار
     ،،،،،،، وتفضلوا بقبول فائق الاحترام 
     مدیر عام
     الإدارة العامة للعقود و قرارات التأسیس
     دالیا نبیل
    </div>
    </html>
    `;
};
