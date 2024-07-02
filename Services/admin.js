const adminRepository = require("../Repositories/admin");
const JwtService = require("./JwtService");

module.exports.addadmin = async (data) => {
  try {
    if (data.adminType === "admin" || data.adminType == undefined) {
      const created = await adminRepository.addadmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "admin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    } else {
      console.log("new here")
      const created = await DataEntryRepository.addSecondAdmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "admin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addFirstAdmin = async (data) => {
  try {
    const created = await adminRepository.addFirstAdmin(data);
    if (created.status) {
      const tokenData = {
        id: created.id,
        name: data.name,
        role: "admin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginadmin = async (data) => {
  try {
    const avalable = await adminRepository.loginadmin(data);
    if (avalable.status && avalable.type === "admin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "admin",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else if (avalable.status && avalable.type === "secondAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "secondAdmin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNotifications = async (data) => {
  try {
    const result = await adminRepository.addNotifications(data);
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNotifications2 = async (data) => {
  try {
    const result = await adminRepository.addNotifications2(data);
    return result;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Dashboard
module.exports.getusers = async () => {
  try {
    const users = await adminRepository.getusers();
    return users;
  } catch (error) {
    throw new Error(`Error while fetching users: ${error.message}`);
  }
};

module.exports.deleteuser = async (userId) => {
  try {
    await adminRepository.deleteuser(userId);
    return { message: 'user deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting user: ${error.message}`);
  }
};

module.exports.toggleApproval = async (userId,value) => {
  try {
    await adminRepository.toggleApproval(userId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

//submissionlist
module.exports.getBusinessIncome = async (req, res) => {
  try {
    const businessIncome = await adminRepository.getBusinessIncome()
    return res.json(businessIncome);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};


// get income details




module.exports.getBusinessIncomeByuserId = async (userId) => {
    try {
        return await adminRepository.getBusinessIncomeByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching business income');
    }
};

module.exports.getEmployeeIncomeByuserId = async (userId) => {
    try {
        return await adminRepository.getEmployeeIncomeByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching employee income');
    }
};

module.exports.getInvestIncomeByuserId = async (userId) => {
    try {
        return await adminRepository.getInvestIncomeByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching investment income');
    }
};

module.exports.getOtherIncomeByuserId = async (userId) => {
    try {
        return await adminRepository.getOtherIncomeByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching other income');
    }
};


module.exports.getCapitalValueGainByuserId = async (userId) => {
    try {
        return await adminRepository.getCapitalValueGainByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching capital value gain');
    }
};

module.exports.getApitByuserId = async (userId) => {
    try {
        return await adminRepository.getApitByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching APIT');
    }
};

module.exports.getReliefForExpenditureByuserId = async (userId) => {
    try {
        return await adminRepository.getReliefForExpenditureByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching relief for expenditure');
    }
};

module.exports.getReliefForRentIncomeByuserId = async (userId) => {
    try {
        return await adminRepository.getReliefForRentIncomeByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching relief for rent income');
    }
};

module.exports.getSelfAssessmentPaymentByuserId = async (userId) => {
    try {
        return await adminRepository.getSelfAssessmentPaymentByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching self assessment payment');
    }
};

module.exports.getTerminalBenefitsByuserId = async (userId) => {
    try {
        return await adminRepository.getTerminalBenefitsByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching terminal benefits');
    }
};

module.exports.getWhtOnInvestmentIncomeByuserId = async (userId) => {
    try {
        return await adminRepository.getWhtOnInvestmentIncomeByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching WHT on investment income');
    }
};

module.exports.getWhtOnServiceFeeReceivedByuserId = async (userId) => {
    try {
        return await adminRepository.getWhtOnServiceFeeReceivedByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching WHT on service fee received');
    }
};

module.exports.getWhtWhichIsNotDeductedByuserId = async (userId) => {
    try {
        return await adminRepository.getWhtWhichIsNotDeductedByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching WHT which is not deducted');
    }
};

module.exports.getQualifyingPaymentsByuserId = async (userId) => {
    try {
        return await adminRepository.getQualifyingPaymentsByuserId(userId);
    } catch (error) {
        throw new Error('Error fetching qualifying payments');
    }
};


//verify buttons
module.exports.verifyBusinessIncome = async (incomeId,value) => {
  try {
    await adminRepository.verifyBusinessIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.verifyEmploymentIncome = async (incomeId,value) => {
  try {
    await adminRepository.verifyEmploymentIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.verifyInvestmentIncome = async (incomeId,value) => {
  try {
    await adminRepository.verifyInvestmentIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};
module.exports.verifyOtherIncome = async (incomeId,value) => {
  try {
    await adminRepository.verifyOtherIncome(incomeId,value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

// Add these functions in adminService.js

module.exports.verifyCapitalValueGain = async (incomeId, value) => {
  try {
    await adminRepository.verifyCapitalValueGain(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyReliefForExpenditure = async (incomeId, value) => {
  try {
    await adminRepository.verifyReliefForExpenditure(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyReliefForRentIncome = async (incomeId, value) => {
  try {
    await adminRepository.verifyReliefForRentIncome(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyQualifyingPayments = async (incomeId, value) => {
  try {
    await adminRepository.verifyQualifyingPayments(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyTerminalBenefits = async (incomeId, value) => {
  try {
    await adminRepository.verifyTerminalBenefits(incomeId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyApit = async (APITId, value) => {
  try {
    await adminRepository.verifyApit(APITId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};



module.exports.verifyWhtOnServiceFeeReceived = async (taxCreditId, value) => {
  try {
    await adminRepository.verifyWhtOnServiceFeeReceived(taxCreditId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyWhtWhichIsNotDeducted = async (taxCreditId, value) => {
  try {
    await adminRepository.verifyWhtWhichIsNotDeducted(taxCreditId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifyWhtOnInvestmentIncome = async (taxCreditId, value) => {
  try {
    await adminRepository.verifyWhtOnInvestmentIncome(taxCreditId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.verifySelfAssessmentPayment = async (paymentId, value) => {
  try {
    await adminRepository.verifySelfAssessmentPayment(paymentId, value);
    return { message: 'Approval status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.requestDocument = async (userId, documentName) => {
  try {
    await adminRepository.requestDocument(userId, documentName);
    return { message: 'rquest document status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};

module.exports.requestAgainDocument = async (userId, documentName) => {
  try {
    await adminRepository.requestAgainDocument(userId, documentName);
    return { message: 'rquest document status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling approval status: ${error.message}`);
  }
};


module.exports.createPolicy = async (data) => {
  try {
    const created = await adminRepository.createPolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.updatePolicy = async (data) => {
  try {
    const created = await adminRepository.updatePolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};



module.exports.deletePolicy = async (data) => {
  try {
    const created = await adminRepository.deletePolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.policy = async () => {
  try {
    const created = await adminRepository.policy();
    return created;
  } catch (error) {
    console.error(`Error in service: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.optionalpolicy = async () => {
  try {
    const created = await adminRepository.optionalpolicy();
    return created;
  } catch (error) {
    console.error(`Error in service: ${error.message}`);
    return { status: false, message: error.message };
  }
};


module.exports.updateoptionalpolicy = async (data) => {
  try {
    const created = await adminRepository.updateoptionalpolicy(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


//update submission status

module.exports.updateSubmissionStatusBusinessIncome = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusBusinessIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusEmploymentIncome = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusEmploymentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusInvestmentIncome = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusInvestmentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusOtherIncome = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusOtherIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusreliefForExpenditure = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusreliefForExpenditure(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusCapitalValueGain = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusCapitalValueGain(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusReliefForRentIncome = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusReliefForRentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusQualifyingPayments = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusQualifyingPayments(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusTerminalBenefits = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusTerminalBenefits(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtOnInvestmentIncome = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusWhtOnInvestmentIncome(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtOnServiceFeeReceived = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusWhtOnServiceFeeReceived(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusWhtWhichIsNotDeducted = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusWhtWhichIsNotDeducted(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusApit = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusApit(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

module.exports.updateSubmissionStatusSelfAssessmentPayment = async (incomeId) => {
  try {
    await adminRepository.updateSubmissionStatusSelfAssessmentPayment(incomeId);
    return { message: 'false status toggled successfully' };
  } catch (error) {
    throw new Error(`Error while toggling false status: ${error.message}`);
  }
};

//Mailbox
module.exports.getinboxMail = async () => {
  try {
    const inboxMail = await adminRepository.getinboxMail();
    return inboxMail;
  } catch (error) {
    throw new Error(`Error while fetching inboxmail: ${error.message}`);
  }
};

module.exports.deletetInboxmail = async (emailId) => {
  try {
    await adminRepository.deletetInboxmail(emailId);
    return { message: 'Email deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting inboxmail: ${error.message}`);
  }
};

module.exports.getSentMail = async () => {
  try {
    const sentMail = await adminRepository.getSentMail();
    return sentMail;
  } catch (error) {
    throw new Error(`Error while fetching sentmail: ${error.message}`);
  }
};

module.exports.deleteSentMail = async (emailId) => {
  try {
    await adminRepository.deleteSentMail(emailId);
    return { message: 'Email deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting sentmail: ${error.message}`);
  }
};

