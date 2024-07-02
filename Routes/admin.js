const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const adminController =require('../Controllers/admin')


router.post('/register',JwtService.roleBasedAuth(["admin"]),adminController.addadmin);

router.post('/createfirstadmin',adminController.addFirstAdmin);

router.post('/login',adminController.loginadmin);

router.post('/addnotifications',adminController.addNotifications);
router.post('/addnotifications2',adminController.addNotifications2);
router.get("/getusers",adminController.getusers);

router.get("/getBusinessIncome/",adminController.getBusinessIncome);

router.delete("/deleteusers/:id", adminController.deleteuser);
router.put("/updateUserApprovalStatus", adminController.toggleApproval);

//get income details
router.get('/getbusinessincome/:userId', adminController.getBusinessIncomeByuserId);
router.get('/getemployeeincome/:userId', adminController.getEmployeeIncomeByuserId);
router.get('/getinvestmentincome/:userId', adminController.getInvestIncomeByuserId);
router.get('/getotherincome/:userId', adminController.getOtherIncomeByuserId);
router.get('/getcapitalvaluegain/:userId', adminController.getCapitalValueGain);
router.get('/getapit/:userId', adminController.getApit);
router.get('/getreliefforexpenditure/:userId', adminController.getReliefForExpenditure);
router.get('/getreliefforrentincome/:userId', adminController.getReliefForRentIncome);
router.get('/getselfassessmentpayment/:userId', adminController.getSelfAssessmentPayment);
router.get('/getTerminalBenefits/:userId', adminController.getTerminalBenefits);
router.get('/getwhtoninvestmentincome/:userId', adminController.getWhtOnInvestmentIncome);
router.get('/getwhtonservicefeereceived/:userId', adminController.getWhtOnServiceFeeReceived);
router.get('/getwhtwhichisnotdeducted/:userId', adminController.getWhtWhichIsNotDeducted);
router.get('/getqualifyingpayments/:userId', adminController.getQualifyingPayments);
 
router.put("/verifyBusinessIncome", adminController.verifyBusinessIncome);
router.put("/verifyEmploymentIncome", adminController.verifyEmploymentIncome);
router.put("/verifyInvestmentIncome", adminController.verifyInvestmentIncome);
router.put("/verifyOtherIncome", adminController.verifyOtherIncome);

router.put("/verifyCapitalValueGain", adminController.verifyCapitalValueGain);
router.put("/verifyReliefForExpenditure", adminController.verifyReliefForExpenditure);
router.put("/verifyReliefForRentIncome", adminController.verifyReliefForRentIncome);
router.put("/verifyQualifyingPayments", adminController.verifyQualifyingPayments);
router.put("/verifyTerminalBenefits", adminController.verifyTerminalBenefits);


router.put("/verifyApit", adminController.verifyApit);
router.put("/verifyWhtOnServiceFeeReceived", adminController.verifyWhtOnServiceFeeReceived);
router.put("/verifyWhtWhichIsNotDeducted", adminController.verifyWhtWhichIsNotDeducted);
router.put("/verifyWhtOnInvestmentIncome", adminController.verifyWhtOnInvestmentIncome);
router.put("/verifySelfAssessmentPayment", adminController.verifySelfAssessmentPayment);


router.post("/requestDocument",adminController.requestDocument);
router.post("/requestAgainDocument",adminController.requestAgainDocument);

//update submission status
router.put("/updateSubmissionStatusBusinessIncome/:incomeId", adminController.updateSubmissionStatusBusinessIncome);
router.put("/updateSubmissionStatusEmploymentIncome/:incomeId", adminController.updateSubmissionStatusEmploymentIncome);
router.put("/updateSubmissionStatusInvestmentIncome/:incomeId", adminController.updateSubmissionStatusInvestmentIncome);
router.put("/updateSubmissionStatusOtherIncome/:incomeId", adminController.updateSubmissionStatusOtherIncome);
router.put("/updateSubmissionStatusreliefForExpenditure/:incomeId", adminController.updateSubmissionStatusreliefForExpenditure);
router.put("/updateSubmissionStatusCapitalValueGain/:incomeId", adminController.updateSubmissionStatusCapitalValueGain);
router.put("/updateSubmissionStatusReliefForRentIncome/:incomeId", adminController.updateSubmissionStatusReliefForRentIncome);
router.put("/updateSubmissionStatusQualifyingPayments/:incomeId", adminController.updateSubmissionStatusQualifyingPayments);
router.put("/updateSubmissionStatusTerminalBenefits/:incomeId", adminController.updateSubmissionStatusTerminalBenefits);
router.put("/updateSubmissionStatusWhtOnInvestmentIncome/:incomeId", adminController.updateSubmissionStatusWhtOnInvestmentIncome);
router.put("/updateSubmissionStatusWhtOnServiceFeeReceived/:incomeId", adminController.updateSubmissionStatusWhtOnServiceFeeReceived);
router.put("/updateSubmissionStatusWhtWhichIsNotDeducted/:incomeId", adminController.updateSubmissionStatusWhtWhichIsNotDeducted);
router.put("/updateSubmissionStatusApit/:incomeId", adminController.updateSubmissionStatusApit);
router.put("/updateSubmissionStatusSelfAssessmentPayment/:incomeId", adminController.updateSubmissionStatusSelfAssessmentPayment);
router.put("/updateSubmissionStatusreliefForExpenditure/:incomeId", adminController.updateSubmissionStatusreliefForExpenditure);


router.patch('/updatePolicy',adminController.updatePolicy);

router.delete('/deletePolicy',adminController.deletePolicy);

router.get('/policy',adminController.policy);

// optional policies

router.get('/optionalpolicy',adminController.optionalpolicy);

router.patch('/updateoptionalpolicy',adminController.updateoptionalpolicy);

router.post('/createPolicy',adminController.createPolicy);


//Mailbox

router.get("/getinboxemail",adminController.getinboxMail);
router.delete("/deletetInboxemail/:emailId", adminController.deletetInboxmail);


router.get("/getsentemail",adminController.getSentMail);
router.delete("/deleteSentemail/:emailId", adminController.deleteSentMail);





 

module.exports = router;