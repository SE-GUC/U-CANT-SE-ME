const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios=require('axios');
const pdf=require('html-pdf');
const ExternalEntity = require("../models/ExternalEntity");
const validator = require('../validations/externalEntityValidations');
const Investor = require("../models/Investor");
const Case = require("../models/Case");
// GET
exports.getAllExternalEntities = async function(req, res) {
  const externalEntities = await ExternalEntity.find();
  res.json({ data: externalEntities});
};

// GET Specific External Entity
exports.getSpecificExternalEntity = async function(req, res) {
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ error:"Incorrect Mongo ID"});
    const requestedExtEntity = await ExternalEntity.findById(mongoose.Types.ObjectId(req.params.id));
    if(requestedExtEntity===null) return res.status(404).send("External Entity not Found");
    res.json({ data: requestedExtEntity });
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};

// POST
exports.createExternalEntity = async function(req, res) {
  try{
    const name = req.body.name;
    const socket = req.body.socket;
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    let checkNameExists = await ExternalEntity.where("name",name);
    let checkSocketExists = await ExternalEntity.where("socket",socket);
    if(checkNameExists.length>0) return res.status(400).send({ error: "External Entity Name is already taken"});
    if(checkSocketExists.length>0) return res.status(400).send({ error: "External Entity Socket is already taken"});
    const newExtEntity = await ExternalEntity.create(req.body);
    res.json({msg:'External Entity was created successfully', data: newExtEntity});
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};

// PUT
exports.updateExternalEntity = async function(req, res){
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ error:"Incorrect Mongo ID"});
    const name = req.body.name;
    const description = req.body.description;
    const socket = req.body.socket;
    const toBeUpdatedExtEntity = await ExternalEntity.findById(req.params.id);
    if(toBeUpdatedExtEntity===null) return res.status(404).send("External Entity not Found");
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    if(name){
      let checkNameExists = await ExternalEntity.where("name",name);
      if(checkNameExists.length>0) return res.status(400).send({ error: "External Entity Name is already taken"});
      toBeUpdatedExtEntity.name=name;
    }
    if(description){
      toBeUpdatedExtEntity.description=description;
    }
    if(socket){
      let checkSocketExists = await ExternalEntity.where("socket",socket);
      if(checkSocketExists.length>0) return res.status(400).send({ error: "External Entity Socket is already taken"});
      toBeUpdatedExtEntity.socket=socket;
    }
    await ExternalEntity.findByIdAndUpdate(req.params.id,toBeUpdatedExtEntity);
    res.json({msg:'External Entity was updated successfully', data: toBeUpdatedExtEntity});
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};

exports.deleteExternalEntity = async function(req, res) {
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ error:"Incorrect Mongo ID"});
    const deletedExtEntity = await ExternalEntity.findByIdAndDelete(req.params.id);
    if(deletedExtEntity===null) return res.status(404).send("External Entity not Found");
    return res.json({msg:"External Entity deleted successfully", data: deletedExtEntity });
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};


exports.generateSPCPdf = async function(req,res){
 
  const caseId=req.params.id;
  const html=await getHTMLForSPc(caseId);
  const fileName='decision'+caseId+'.pdf';
  pdf.create(html, {}).toFile(fileName, (err,Response) => {
  if(err) {
    return console.log('error');
  }
  
  res.sendFile(Response.filename);
  })
  
}

exports.viewSPCHtml=async function(req,res){
 
  const caseId=req.params.id;
  const html=await getHTMLForSPc(caseId);
  res.send(html);
  
};
getHTMLForSPc = async function(caseId){
  const cas=await Case.findById(caseId);
  const regulatedLaw=cas.form.regulatedLaw;
  const companyNameArabic=cas.form.companyNameArabic;
  const creatorInvestorId=cas.creatorInvestorId;
  const investor=await Investor.findById(creatorInvestorId);
  const investorName=investor.fullName;
  const nationality=investor.nationality;
  const capital=cas.form.capital;
  const currency=cas.form.currencyUsedForCapital;
  
  const html=toSPCHTML({investorName:investorName,companyNameArabic:companyNameArabic,nationality:nationality
  ,capital:capital,currency:currency});
  return html;
}

toSPCHTML = function(data){
    
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

