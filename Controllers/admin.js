const adminService = require("../Services/admin");
const { admin } = require("../models");

module.exports.addadmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }
    console.log("came here")
    const result = await adminService.addadmin(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else if (result.message == "already registered user") {
      return res.json({ status: false, message: "already registered user" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.addFirstAdmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await adminService.addFirstAdmin(req.body);

    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    } else if (result.message == "user exist") {
      return res.json({ Status: "Failed", message: "user exist" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.loginadmin = async (req, res) => {
  if (
    req.body.userName == undefined ||
    req.body.userName == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    return res.status(400).json({ status: false, message: "empty fields" });
  }
  const result = await adminService.loginadmin(req.body);
  if (!result.status) {
    res.json({ Status: "Failed" });
  } else {
    if (result.type === "admin") {
      res.cookie("token", result.token);
      res.json({ Status: "Success", Type: "admin" });
    } else {
      res.cookie("token", result.token);
      res.json({ Status: "Success", Type: "secondAdmin" });
    }
  }
};


module.exports.addNotifications = async (req, res) => {
  try {
    const result = await adminService.addNotifications(req.body);

    if (result.status) {
      return res.json({ Status: "Success"});
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.addNotifications2 = async (req, res) => {
  try {
    const result = await adminService.addNotifications2(req.body);

    if (result.status) {
      return res.json({ Status: "Success"});
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};


//Dashboard
module.exports.getusers = async (req, res) => {
  try {
    const users = await adminService.getusers()
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

module.exports.deleteuser = async (req, res) => {
  try {
    await adminService.deleteuser(req.params.id)
    return res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.toggleApproval = async (req, res) => {
  try {
    await adminService.toggleApproval(req.body.id,req.body.isVerifiedUser);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//SubmissionList
module.exports.getBusinessIncome = async (req, res) => {
  try {
    const businessIncome = await adminService.getBusinessIncome()
    return res.json(businessIncome);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

//get income details


module.exports.getBusinessIncomeByuserId = async (req, res) => {
    try {
        const result = await adminService.getBusinessIncomeByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getEmployeeIncomeByuserId = async (req, res) => {
    try {
        const result = await adminService.getEmployeeIncomeByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getInvestIncomeByuserId = async (req, res) => {
    try {
        const result = await adminService.getInvestIncomeByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getOtherIncomeByuserId = async (req, res) => {
    try {
        const result = await adminService.getOtherIncomeByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.getCapitalValueGain = async (req, res) => {
    try {
        const result = await adminService.getCapitalValueGainByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getApit = async (req, res) => {
    try {
        const result = await adminService.getApitByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getReliefForExpenditure = async (req, res) => {
    try {
        const result = await adminService.getReliefForExpenditureByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getReliefForRentIncome = async (req, res) => {
    try {
        const result = await adminService.getReliefForRentIncomeByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getSelfAssessmentPayment = async (req, res) => {
    try {
        const result = await adminService.getSelfAssessmentPaymentByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getTerminalBenefits = async (req, res) => {
    try {
        const result = await adminService.getTerminalBenefitsByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getWhtOnInvestmentIncome = async (req, res) => {
    try {
        const result = await adminService.getWhtOnInvestmentIncomeByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getWhtOnServiceFeeReceived = async (req, res) => {
    try {
        const result = await adminService.getWhtOnServiceFeeReceivedByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getWhtWhichIsNotDeducted = async (req, res) => {
    try {
        const result = await adminService.getWhtWhichIsNotDeductedByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getQualifyingPayments = async (req, res) => {
    try {
        const result = await adminService.getQualifyingPaymentsByuserId(req.params.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//verify buttons
module.exports.verifyBusinessIncome = async (req, res) => {
  try {
    await adminService.verifyBusinessIncome(req.body.incomeId,req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyEmploymentIncome = async (req, res) => {
  try {
    await adminService.verifyEmploymentIncome(req.body.incomeId,req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyInvestmentIncome = async (req, res) => {
  try {
    await adminService.verifyInvestmentIncome(req.body.incomeId,req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyOtherIncome = async (req, res) => {
  try {
    await adminService.verifyOtherIncome(req.body.incomeId,req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Add these functions in adminController.js

module.exports.verifyCapitalValueGain = async (req, res) => {
  try {
    await adminService.verifyCapitalValueGain(req.body.assessmentId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyReliefForExpenditure = async (req, res) => {
  try {
    await adminService.verifyReliefForExpenditure(req.body.reliefid, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyReliefForRentIncome = async (req, res) => {
  try {
    await adminService.verifyReliefForRentIncome(req.body.reliefid, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyQualifyingPayments = async (req, res) => {
  try {
    await adminService.verifyQualifyingPayments(req.body.reliefid, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyTerminalBenefits = async (req, res) => {
  try {
    await adminService.verifyTerminalBenefits(req.body.assessmentId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.verifyApit = async (req, res) => {
  try {
    await adminService.verifyApit(req.body.APITId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyWhtOnServiceFeeReceived = async (req, res) => {
  try {
    await adminService.verifyWhtOnServiceFeeReceived(req.body.taxCreditId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (req, res) => {
  try {
    await adminService.verifyWhtWhichIsNotDeducted(req.body.assessmentId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (req, res) => {
  try {
    await adminService.verifyWhtOnInvestmentIncome(req.body.taxCreditId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifySelfAssessmentPayment = async (req, res) => {
  try {
    await adminService.verifySelfAssessmentPayment(req.body.taxCreditId, req.body.isverified);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.requestDocument = async (req, res) => {
  try {
    await adminService.requestDocument(req.body.userId, req.body.documentName);
    return res.json({ message: "rquest document status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.requestAgainDocument = async (req, res) => {
  try {
    await adminService.requestAgainDocument(req.body.userId, req.body.documentName);
    return res.json({ message: "rquest document status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createPolicy = async (req, res) => {
  try {
    if (
      req.body.title == undefined ||
      req.body.title == ""

    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }
    console.log("hhhjjhjjj");
    const result = await adminService.createPolicy(req.body);

    //console.log(result);
    return res.status(200).json(result);

  } catch (error) {
    return { status: false };
  }
};


module.exports.updatePolicy = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }
    const result = await adminService.updatePolicy(req.body);
    if (result.status) {
      return res.json({ Status: "Success" });
    }

    
  } catch (error) {
    return res.status(400).json({Status: "NotSuccess", message: error.message });
  }
};



module.exports.deletePolicy = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }
    console.log("tttttttnnnnnnnnnnn");
    console.log(req.body)
    const result = await adminService.deletePolicy(req.body);
    
    
    if (result.status) {
      console.log("sucesssssssss")
      return res.json({ Status: "Success" });
    }

    
  } catch (error) {
    return res.status(400).json({Status: "NotSuccess", message: error.message });
  }
};



module.exports.policy = async (req, res) => {
  try {
    const result = await adminService.policy();
    // Return the result as a JSON response with a status code of 200
    return res.status(200).json(result);

  } catch (error) {
    console.error(`Error in controller: ${error.message}`);
    return res.status(500).json({ status: false, message: error.message });
  }
};


module.exports.optionalpolicy = async (req, res) => {
  try {
    const result = await adminService.optionalpolicy();
    // Return the result as a JSON response with a status code of 200
    return res.status(200).json(result);

  } catch (error) {
    console.error(`Error in controller: ${error.message}`);
    return res.status(500).json({ status: false, message: error.message });
  }
};



module.exports.updateoptionalpolicy = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "empty request" });
    }
    const result = await adminService.updateoptionalpolicy(req.body);
    if (result.status) {
      return res.json({ Status: "Success" });
    }

    
  } catch (error) {
    return res.status(400).json({Status: "NotSuccess", message: error.message });
  }
};


//update submission status

module.exports.updateSubmissionStatusBusinessIncome = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusBusinessIncome(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusEmploymentIncome = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusEmploymentIncome(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusInvestmentIncome = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusInvestmentIncome(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusOtherIncome = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusOtherIncome(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusCapitalValueGain = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusCapitalValueGain(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusReliefForRentIncome = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusReliefForRentIncome(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusQualifyingPayments = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusQualifyingPayments(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusTerminalBenefits = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusTerminalBenefits(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusWhtOnInvestmentIncome = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusWhtOnInvestmentIncome(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusWhtOnServiceFeeReceived = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusWhtOnServiceFeeReceived(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusWhtWhichIsNotDeducted = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusWhtWhichIsNotDeducted(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusApit = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusApit(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSubmissionStatusSelfAssessmentPayment = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusSelfAssessmentPayment(req.params.incomeId);
    return res.json({ message: "Submission status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports.updateSubmissionStatusreliefForExpenditure = async (req, res) => {
  try {
    await adminService.updateSubmissionStatusreliefForExpenditure(req.params.incomeId);
    return res.json({ message: "User approval status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

//Mailbox
module.exports.getinboxMail = async (req, res) => {
  try {
    const inboxMail = await adminService.getinboxMail()
    return res.json(inboxMail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

module.exports.deletetInboxmail = async (req, res) => {
  try {
    await adminService.deletetInboxmail(req.params.emailId)
    return res.json({ message: "Inboxmail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports.getSentMail = async (req, res) => {
  try {
    const sentMail = await adminService.getSentMail()
    return res.json(sentMail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

module.exports.deleteSentMail = async (req, res) => {
  try {
    await adminService.deleteSentMail(req.params.emailId)
    return res.json({ message: "sentmail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




