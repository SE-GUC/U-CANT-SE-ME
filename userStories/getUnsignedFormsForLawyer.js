// As a lawyer I should be able to view a company establishment form made by an investor, 
// so that I can review it.

const lawyerAuthenticated=true;
const Case = require("../../models/Case.js")

router.get('/:lawyerID/', async (req,res) =>{
    try{
        if(lawyerAuthenticated){
            let allcases = await Case.where("caseStatus","WaitingForLawyer");
            res.json(allcases);
        }
        else
            res.status(403).send({error: "Forbidden." })
    }
    catch(error){
        res.json({msg: "An error has occured."})
    }
});


router.get('/:lawyerID/:caseID', async (req,res) =>{
    try{
        if(lawyerAuthenticated){
            let selectedCase = await Case.findbyId(req.CaseId);
            if(selectedCase.caseStatus === "WaitingForLawyer" ){   
                selectedCase.caseStatus = "AssignedToLawyer";
                selectedCase.assignedLawyerId = req.LawyerID;
                selectedCase.assignedLawyers.push(req.LawyerID);
                res.json(allcases);
            }
            else
                res.status(403).send({error: "Case is not supported." }) 
        }
        else
            res.status(403).send({error: "Forbidden." })
    }
    catch(error){
        res.json({msg: "An error has occured."})
    }
});
