const bcrypt = require("bcrypt");
const { admin, SecondAdmin, Notification,Policies } = require("../models");
const jwt = require("jsonwebtoken");



module.exports.addadmin = async (obj) => {
  try {
    const existingUser1 = await admin.findOne({
      where: { userName: obj.userName },
    });
    const existingUser2 = await SecondAdmin.findOne({
      where: { userName: obj.userName },
    });

    if (existingUser1 || existingUser2) {
      return { status: false, message: "already registered user" };
    }
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    const res = await admin.create(data);

    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.addFirstAdmin = async (obj) => {
  try {
    const count = await admin.count();
    if (count == 0) {
      const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
      var data = obj;
      data.password = hashedPw;
      data.password = obj.password;
      const res = await admin.create(data);

      return { status: true, id: res.dataValues.id };
    } else {
      return { status: false, message: "user exist" };
    }
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginadmin = async (obj) => {
  try {
    const admin = await admin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (admin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        admin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: admin.dataValues.name,
          id: admin.dataValues.id,
          type: "admin",
        };
      }
    }

    const secondAdmin = await SecondAdmin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (secondAdmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        secondAdmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: secondAdmin.dataValues.name,
          id: secondAdmin.dataValues.id,
          type: "secondAdmin",
        };
      }
    }

    return { status: false, message: "Admin not found" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.addNotifications = async (obj) => {
  try {
    // Assuming obj contains the necessary fields to create a Notification
    const {  userId,documentName } = obj;
    console.log(obj)

    // Create a new notification
    const newNotification = await Notification.create({
      message:`submit your ${documentName} document`,
      isViewed: false, // Default value, can be omitted if not needed
      userId:userId
    });

    return { status: true, data: newNotification };
  } catch (error) {
    console.error('Error adding notification:', error);
    return { status: false, error: error.message };
  }
};

module.exports.addNotifications2 = async (obj) => {
  try {
    // Assuming obj contains the necessary fields to create a Notification
    const {  userId,documentName } = obj;
    console.log(obj)

    // Create a new notification
    const newNotification = await Notification.create({
      message:`submit your ${documentName} document Again Please check your email for more detail`,
      isViewed: false, // Default value, can be omitted if not needed
      userId:userId
    });

    return { status: true, data: newNotification };
  } catch (error) {
    console.error('Error adding notification:', error);
    return { status: false, error: error.message };
  }
};


//Dashboard
const { user } = require('../models');

module.exports.getusers = async () => {
  try {
    const users = await user.findAll();
    console.log(users)
    return users;
  } catch (error) {
    throw new Error(`Error while fetching users: ${error.message}`);
  }
};


module.exports.deleteuser = async (userId) => {
  try {
    //check wether userid exsits
    const existuser =  await user.findOne({where: {id: userId}});
    if(existuser){
        await user.destroy({where: {id: userId}});
    }else{
        return {message: "user do not found" };  
    }
    
  } catch (error) {
    throw new Error(`Error while deleting user: ${error.message}`);
  }
};

module.exports.toggleApproval = async (userId, value) => {
  try {
    const existuser = await user.findOne({ where: { id:userId } });
    console.log(userId,value)
    if (existuser) {
      await existuser.update({ isVerifiedUser: value });
    } else {
      return { message: "user do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveuser user: ${error.message}`);
  }
};


//submissionList


module.exports.getBusinessIncome = async () => {
  try {
    const BusinessIncome = await businessIncome.findAll();
    console.log(BusinessIncome)
    return BusinessIncome;
  } catch (error) {
    throw new Error(`Error while fetching users: ${error.message}`);
  }
};


//get income details
const { businessIncome, employmentIncome, investmentIncome, otherIncome,capitalValueGain,  reliefForExpenditure, reliefForRentIncome,qualifyingPayments, terminalBenefits, whtOnInvestmentIncome,whtOnServiceFeeReceived, whtWhichIsNotDeducted, apit,selfAssessmentPayment } = require('../models');



module.exports.getBusinessIncomeByuserId = async (userId) => {
  return await businessIncome.findAll({ where: { userId: userId } });
};

module.exports.getEmployeeIncomeByuserId = async (userId) => {
  return await employmentIncome.findAll({ where: { userId: userId } });
};

module.exports.getInvestIncomeByuserId = async (userId) => {
  return await investmentIncome.findAll({ where: { userId: userId } });
};

module.exports.getOtherIncomeByuserId = async (userId) => {
  return await otherIncome.findAll({ where: { userId: userId } });
};

module.exports.getCapitalValueGainByuserId = async (userId) => {
  return await capitalValueGain.findAll({ where: { userId: userId } });
};

module.exports.getApitByuserId = async (userId) => {
  return await apit.findAll({ where: { userId: userId } });
};

module.exports.getReliefForExpenditureByuserId = async (userId) => {
  return await reliefForExpenditure.findAll({ where: { userId: userId } });
};

module.exports.getReliefForRentIncomeByuserId = async (userId) => {
  return await reliefForRentIncome.findAll({ where: { userId: userId } });
};

module.exports.getSelfAssessmentPaymentByuserId = async (userId) => {
  return await selfAssessmentPayment.findAll({ where: { userId: userId } });
};

module.exports.getTerminalBenefitsByuserId = async (userId) => {
  return await terminalBenefits.findAll({ where: { userId: userId } });
};

module.exports.getWhtOnInvestmentIncomeByuserId = async (userId) => {
  return await whtOnInvestmentIncome.findAll({ where: { userId: userId } });
};

module.exports.getWhtOnServiceFeeReceivedByuserId = async (userId) => {
  return await whtOnServiceFeeReceived.findAll({ where: { userId: userId } });
};

module.exports.getWhtWhichIsNotDeductedByuserId = async (userId) => {
  return await whtWhichIsNotDeducted.findAll({ where: { userId: userId } });
};

module.exports.getQualifyingPaymentsByuserId = async (userId) => {
  return await qualifyingPayments.findAll({ where: { userId: userId } });
};


//verify button
module.exports.verifyBusinessIncome = async (incomeId, value) => {
  try {
    const existIncome = await businessIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveuser user: ${error.message}`);
  }
};

module.exports.verifyEmploymentIncome = async (incomeId, value) => {
  try {
    const existIncome = await employmentIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveuser user: ${error.message}`);
  }
};

module.exports.verifyInvestmentIncome = async (incomeId, value) => {
  try {
    const existIncome = await investmentIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveuser user: ${error.message}`);
  }
};
module.exports.verifyOtherIncome = async (incomeId, value) => {
  try {
    const existIncome = await otherIncome.findOne({ where: { incomeId:incomeId } });
    
    console.log(incomeId,value)
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user do not found" };
    }
  } catch (error) {
    throw new Error(`Error while approveuser user: ${error.message}`);
  }
};

module.exports.verifyApit = async (APITId, value) => {
  try {
    const existIncome = await apit.findOne({ where: { APITId: APITId } });

    console.log(APITId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving APIT: ${error.message}`);
  }
};


module.exports.verifyWhtOnServiceFeeReceived = async (taxCreditId, value) => {
  try {
    const existIncome = await whtOnServiceFeeReceived.findOne({ where: { taxCreditId: taxCreditId } });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT on service fee received: ${error.message}`);
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (taxCreditId, value) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({ where: { assessmentId: taxCreditId } });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT which is not deducted: ${error.message}`);
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (taxCreditId, value) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({ where: { taxCreditId: taxCreditId } });

    console.log(taxCreditId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT on investment income: ${error.message}`);
  }
};

module.exports.verifySelfAssessmentPayment = async (paymentId, value) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({ where: { taxCreditId: paymentId } });

    console.log(paymentId, value);
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving self-assessment payment: ${error.message}`);
  }
};

// Add these functions in adminRepository.js

module.exports.verifyCapitalValueGain = async (incomeId, value) => {
  try {
    const existIncome = await capitalValueGain.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Capital Value Gain: ${error.message}`);
  }
};

module.exports.verifyReliefForExpenditure = async (incomeId, value) => {
  try {
    const existIncome = await reliefForExpenditure.findOne({ where: { reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Relief For Expenditure: ${error.message}`);
  }
};

module.exports.verifyReliefForRentIncome = async (incomeId, value) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({ where: {reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Relief For Rent Income: ${error.message}`);
  }
};

module.exports.verifyQualifyingPayments = async (incomeId, value) => {
  try {
    const existIncome = await qualifyingPayments.findOne({ where: { reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Qualifying Payments: ${error.message}`);
  }
};

module.exports.verifyTerminalBenefits = async (incomeId, value) => {
  try {
    const existIncome = await terminalBenefits.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isverified: value });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Terminal Benefits: ${error.message}`);
  }
};


// request Document
module.exports.requestDocument = async (userId, documentName) => {
  try {
    console.log(userId)
    const user = await user.findOne({ where: { id: userId } });
    
    
  } catch (error) {
    throw new Error(`Error while approving Terminal Benefits: ${error.message}`);
  }
};

module.exports.requestAgainDocument = async (userId, documentName) => {
  try {
    console.log(userId)
    const user = await user.findOne({ where: { id: userId } });
    
    
  } catch (error) {
    throw new Error(`Error while approving Terminal Benefits: ${error.message}`);
  }
};


module.exports.createPolicy = async (data) => {
  try {
    console.log(data);
    await Policies.create({
      title: data.title,
      amount: data.amount,
      rate: data.rate,
      optional: true
    });

    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false, message: error.message };
  }
};

module.exports.updatePolicy = async (obj) => {
  try {
    const { policyId, title, amount, rate } = obj;

    // Find the policy by ID
    const policy = await Policies.findByPk(policyId);

    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Update the policy fields
    policy.title = title;
    policy.amount = amount;
    policy.rate = rate;

    // Save the updated policy
    await policy.save();

    return { status: true };
  } catch (error) {
    console.error("Error updating policy:", error);
    return { status: false, error: error.message };
  }
};

module.exports.deletePolicy = async (data) => {
  try {
    // Find the policy by policyId
    const policy = await Policies.findOne({ where: { policyId: data.policyId } });

    // Check if the policy exists
    if (!policy) { 
      return { status: false, message: "Policy not found" };
    }

    // Check if the policy is optional
    if (!policy.optional) {
      console.log("-----------------------------")
      return { status: false, message: "Policy is not optional and cannot be deleted" };
    }

    // Delete the policy
    await Policies.destroy({ where: { policyId: data.policyId } });

    return { status: true };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { status: false, message: `Error: ${error.message}` };
  }
};


module.exports.optionalpolicy = async () => {
  try {
    // Query the database for records matching the given parameters
    const types = await Policies.findAll({
      where: {
        optional: true,
      },
    });
    return { status: true, data: types };
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};

module.exports.policy = async () => {
  try {
    // Query the database for records matching the given parameters
    const types = await Policies.findAll();
    return { status: true, data: types };
  } catch (error) {
    console.error(`Error in repository: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.updateoptionalpolicy = async (obj) => {
  try {
    const { policyId, title, amount, rate } = obj;

    // Find the policy by ID
    const policy = await Policies.findByPk(policyId);

    if (!policy) {
      return { status: false, message: "Policy not found" };
    }

    // Update the policy fields
    policy.title = title;
    policy.amount = amount;
    policy.rate = rate;

    // Save the updated policy
    await policy.save();

    return { status: true };
  } catch (error) {
    console.error("Error updating policy:", error);
    return { status: false, error: error.message };
  }
};

//update submission status

module.exports.updateSubmissionStatusBusinessIncome = async (incomeId) => {
  try {
    const existIncome = await businessIncome.findOne({ where: { incomeId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Business Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusEmploymentIncome = async (incomeId) => {
  try {
    const existIncome = await employmentIncome.findOne({ where: { incomeId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Employment Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await investmentIncome.findOne({ where: { incomeId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Investment Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusOtherIncome = async (incomeId) => {
  try {
    const existIncome = await otherIncome.findOne({ where: { incomeId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Other Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusreliefForExpenditure = async (reliefid) => {
  try {
    const existIncome = await  reliefForExpenditure.findOne({ where: { reliefid: reliefid } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission:false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Terminal Benefits: ${error.message}`);
  }
};



module.exports.updateSubmissionStatusCapitalValueGain = async (incomeId) => {
  try {
    const existIncome = await capitalValueGain.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Capital Value Gain: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusReliefForRentIncome = async (incomeId) => {
  try {
    const existIncome = await reliefForRentIncome.findOne({ where: { reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Relief for Rent Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusQualifyingPayments = async (incomeId) => {
  try {
    const existIncome = await qualifyingPayments.findOne({ where: { reliefid: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Qualifying Payments: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusTerminalBenefits = async (incomeId) => {
  try {
    const existIncome = await terminalBenefits.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Terminal Benefits: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtOnInvestmentIncome = async (incomeId) => {
  try {
    const existIncome = await whtOnInvestmentIncome.findOne({ where: { taxCreditId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT on Investment Income: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtOnServiceFeeReceived = async (incomeId) => {
  try {
    const existIncome = await whtOnServiceFeeReceived.findOne({ where: {taxCreditId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT on Service Fee Received: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtWhichIsNotDeducted = async (incomeId) => {
  try {
    const existIncome = await whtWhichIsNotDeducted.findOne({ where: { assessmentId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving WHT Which Is Not Deducted: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusApit = async (incomeId) => {
  try {
    const existIncome = await apit.findOne({ where: { APITId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving APIT: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusSelfAssessmentPayment = async (incomeId) => {
  try {
    const existIncome = await selfAssessmentPayment.findOne({ where: { taxCreditId: incomeId } });
    if (existIncome) {
      await existIncome.update({ isnewsubmission: false });
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    throw new Error(`Error while approving Self Assessment Payment: ${error.message}`);
  }
};


//mailbox
const { EmailInbox } = require('../models');

module.exports.getinboxMail = async () => {
  try {
    const inboxMail = await EmailInbox.findAll({
      include: [{
        model: user, // Assumes user is already associated in the EmailInbox model
        as: 'user',
        attributes: ['name', 'email', 'id'], // Specify the fields you want to include from the user table
      }]
    });

    console.log(inboxMail);
    return inboxMail;
  } catch (error) {
    throw new Error(`Error while fetching inboxMail: ${error.message}`);
  }
};


module.exports.deletetInboxmail = async (emailId) => {
  try {
    //check wether userid exsits
    const existEmail =  await EmailInbox.findOne({where: {emailId: emailId}});
    if(existEmail){
        await EmailInbox.destroy({where: {emailId: emailId}});
    }else{
        return {message: "email do not found" };  
    }
    
  } catch (error) {
    throw new Error(`Error while deleting email: ${error.message}`);
  }
};


const { EmailSent } = require('../models');

module.exports.getSentMail = async () => {
  try {
    const SentMail = await EmailSent.findAll({
      include: [{
        model: user, // Assumes user is already associated in the EmailInbox model
        as: 'user',
        attributes: ['name', 'email', 'id'], // Specify the fields you want to include from the user table
      }]
    });

    console.log(SentMail);
    return SentMail;
  } catch (error) {
    throw new Error(`Error while fetching inboxMail: ${error.message}`);
  }
};


module.exports.deleteSentMail = async (emailId) => {
  try {
    //check wether userid exsits
    const existEmail =  await EmailInbox.findOne({where: {emailId: emailId}});
    if(existEmail){
        await EmailSent.destroy({where: {emailId: emailId}});
    }else{
        return {message: "email do not found" };  
    }
    
  } catch (error) {
    throw new Error(`Error while deleting email: ${error.message}`);
  }
};